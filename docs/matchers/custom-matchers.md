import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Custom Matchers

Custom Matchers in JJ allow for extending the request matching capabilities beyond the built-in matchers. They enable the creation of highly customized conditions for matching incoming requests based on specific logic. JJ offers flexibility for developers to create custom logic for request matching through two primary types of matchers:

- **Attribute Matcher**: Matches specific request attributes or values.
- **Request Matcher**: Matches entire requests based on their method, path, headers, etc.

## Attribute Matcher

An **Attribute Matcher** focuses on evaluating a specific value. It accepts any input value and produces a `bool` as output to determine if the request matches the defined conditions.

Here’s an example of a built-in [ContainMatcher](/docs/matchers/attribute-matchers#containmatcher) that checks if a value contains the expected substring:

```python
from typing import Any
from jj.matchers import AttributeMatcher

class ContainMatcher(AttributeMatcher):
    """
    Matches if the actual value contains the expected value.
    """
    
    def __init__(self, expected: Any):
        """
        Initialize with the expected value.
        
        :param expected: The value to search for within the actual value.
        """
        self._expected = expected

    async def match(self, actual: Any) -> bool:
        """
        Check if the actual value contains the expected value.
        
        :param actual: The value being evaluated.
        :return: True if the actual value contains the expected value, else False.
        """
        return self._expected in actual
```

You can create your own custom matcher, such as `StartsWithMatcher`, which checks if the input starts with a specific prefix:

```python
from typing import Any
from jj.matchers import AttributeMatcher

class StartsWithMatcher(AttributeMatcher):
    def __init__(self, value: Any):
        """
        Initialize with the starting value to match.
        
        :param value: The prefix to check.
        """
        self.value = value

    async def match(self, value: Any) -> bool:
        """
        Check if the given value starts with the specified prefix.
        
        :param value: The string being evaluated.
        :return: True if the value starts with the prefix, else False.
        """
        return isinstance(value, str) and value.startswith(self.value)
```

To make the matcher easier to use, you can define a helper function like this:

```python
def startswith(value: Any) -> StartsWithMatcher:
    """
    Helper function to create a StartsWithMatcher instance.
    
    :param value: The prefix to check.
    :return: An instance of StartsWithMatcher.
    """
    return StartsWithMatcher(value)
```

### Usage Example

You can use the custom `StartsWithMatcher` in your mocks like so:

```python
from .starts_with_matcher import startswith

matcher = jj.match_header("Authorization", startswith("Bearer"))
```

In this example, the mock will match any request where the `Authorization` header starts with the prefix "Bearer", which is common in token-based authentication systems.


## Request Matcher

A **Request Matcher** evaluates the entire request, including its method, headers, and other attributes, to determine if it meets specific criteria. It accepts the entire request as input and returns a `bool` to indicate if it matches.

Here’s an example of the built-in [MethodMatcher](/docs/matchers/request-matchers#matching-http-methods) that matches requests based on the HTTP method:

```python
from jj.matchers import EqualMatcher, RequestMatcher
from jj import Request
from typing import Union

class MethodMatcher(RequestMatcher):
    """
    Matches HTTP requests based on the HTTP method.

    This matcher checks if the incoming request uses a specified HTTP method
    (e.g., GET, POST). It supports matching against a static method or an
    attribute-based matcher.
    """

    def __init__(self, method: Union[str, AttributeMatcher], *, resolver: Resolver) -> None:
        """
        Initialize a MethodMatcher with the HTTP method and resolver.

        :param method: The HTTP method to match against, or a matcher that can
                       evaluate the method dynamically.
        :param resolver: The resolver responsible for registering this matcher.
        """
        super().__init__(resolver=resolver)
        if isinstance(method, AttributeMatcher):
            self._matcher = method
        else:
            self._matcher = EqualMatcher(str.upper(method))

    async def match(self, request: Request) -> bool:
        """
        Determine if the request method matches the expected method.

        :param request: The HTTP request containing the method to match.
        :return: `True` if the request method matches the expected method, otherwise `False`.
        """
        return await self._matcher.match(request.method)
```

You can create your own matcher, such as an `AuthTokenMatcher`, which checks if the request contains a specific authorization token in the headers:

```python
from jj import Request, App
from jj.matchers import RequestMatcher
from jj.resolvers import Resolver

class AuthTokenMatcher(RequestMatcher):
    """
    Matches HTTP requests based on the Authorization token.

    This matcher checks if the Authorization header in the incoming request
    matches a specified token.
    """

    def __init__(self, token: str, *, resolver: Resolver):
        """
        Initialize with the expected token and resolver.

        :param token: The expected authorization token to match.
        :param resolver: The resolver responsible for registering this matcher.
        """
        super().__init__(resolver=resolver)
        self.token = token

    async def match(self, request: Request) -> bool:
        """
        Check if the Authorization header contains the expected token.

        :param request: The HTTP request to evaluate.
        :return: `True` if the token matches, otherwise `False`.
        """
        auth_header = request.headers.get('Authorization', '')
        return auth_header == f"Bearer {self.token}"
```

To make the `AuthTokenMatcher` more user-friendly, you can define a helper function:

```python
def match_auth_token(token: str) -> AuthTokenMatcher:
    """
    Helper function to create an AuthTokenMatcher instance.

    :param token: The token to match in the Authorization header.
    :return: An instance of AuthTokenMatcher.
    """
    return AuthTokenMatcher(token, resolver=App.resolver)  # Always use the default resolver
```

:::info
The `resolver` in this context is responsible for registering and resolving matchers on the server-side, allowing for flexible mock management and request handling.
:::

### Usage Example

You can use the custom `AuthTokenMatcher` to match requests with a specific token:

```python
from .auth_token_matcher import match_auth_token

matcher = match_auth_token("123")
```

The matcher can also be combined with other matchers to create more complex conditions. For example, you can use `match_auth_token` with `MethodMatcher` to ensure that only `GET` requests with a valid token are matched:

```python
matcher = jj.match_all([
    jj.match_method("GET"),
    match_auth_token("123"),
])
```


## Registering Matchers

JJ operates with a server-client architecture, meaning that mocks are used on the client and need to be serialized, deserialized, and transmitted to the server. This process involves serializing custom matchers for the server to understand and use.

JJ relies on the [packed](https://pypi.org/project/packed/) package for serialization and deserialization. **packed** is a Python library that leverages the efficient **MessagePack** binary format to serialize (pack) and deserialize (unpack) custom Python objects.

### How It Works

When you register a mock:
1. The JJ client serializes the objects, including the matchers.
2. The JJ client transmits the serialized data to the server in a binary format.
3. The JJ server deserializes the object for use in request matching.

### Supporting Serialization and Deserialization

To make a custom matcher serializable, you need to register it with `packed`. Here’s an example of how to implement the `StartsWithMatcher` with support for serialization:

```python
from packed import packable
from typing import Any
from jj.matchers import AttributeMatcher

# highlight-next-line
@packable  # 1. Register the class for packing
class StartsWithMatcher(AttributeMatcher):
    def __init__(self, value: Any) -> None:
        self.value = value

    async def match(self, value: Any) -> bool:
        return isinstance(value, str) and value.startswith(self.value)

    # highlight-start
    def __packed__(self) -> dict:  # 2. Select the fields to pack
        return {"value": self.value}
    # highlight-end
```

:::info
The `__packed__` method must return **native Python types** (e.g., `dict`, `list`, `str`, `int`) or packable objects. This ensures proper serialization and deserialization of the matcher. For more information, check out the [packed documentation on PyPI](https://pypi.org/project/packed/).
:::

If your class requires custom logic during deserialization (e.g., passing additional parameters like a `resolver`), you can define a `__unpacked__` class method. By default, it will use the constructor, but you can customize it as needed.

Here’s an example of an `AuthTokenMatcher` with custom unpacking logic:

```python
from packed import packable
from jj import Request
from jj.matchers import RequestMatcher
from jj.resolvers import Resolver

# highlight-next-line
@packable  # 1. Register the class for packing
class AuthTokenMatcher(RequestMatcher):
    def __init__(self, token: str, *, resolver: Resolver):
        super().__init__(resolver=resolver)
        self.token = token

    async def match(self, request: Request) -> bool:
        auth_header = request.headers.get('Authorization', '')
        return auth_header == f"Bearer {self.token}"

    # highlight-start
    # 2. Select the fields to pack
    def __packed__(self) -> dict:
        return {"token": self.token}
    # highlight-end

    # highlight-start
    # 3. Custom logic during unpacking, including passing the resolver
    @classmethod
    def __unpacked__(cls, *, token: str, resolver: Resolver) -> "AuthTokenMatcher":
        return cls(token, resolver=resolver)
    # highlight-end
```

### Registering the Matcher with the Server

After defining and serializing your custom matcher, you need to tell the JJ server to use it. Depending on your deployment environment, you can load the matcher using the following methods:

<Tabs>
  <TabItem value="CLI">

```shell
$ jj --port 8080 --use-matchers starts_with_matcher.py
```

  </TabItem>
  <TabItem value="Docker">

```shell
$ docker run \
  -p 8080:80 \  # Map port 8080 on the host to port 80 in the container
  -v ./starts_with_matcher.py:/app/starts_with_matcher.py \  # Mount the custom matcher script into the container
  vedrouniverse/jj \  # Use the JJ mock server Docker image
  --use-matchers /app/starts_with_matcher.py  # Instruct JJ to load the custom matcher
```

  </TabItem>
  <TabItem value="Python">

```python
import jj
from jj.mock import Mock

from auth_token_matcher import starts_with_matcher  # noqa

jj.serve(Mock(), port=8080)
```

  </TabItem>
</Tabs>

In these examples, the JJ server is instructed to load and use the `StartsWithMatcher` or any other custom matchers you have defined, ensuring that they are available for request matching.
