---
id: logical-matchers
---
# Logical Matchers

## Combining Matchers

JJ provides a set of built-in logical matchers that allow you to combine simpler matchers, thereby enabling more comprehensive matching logic.

### Matching One of Many Conditions

The `match_any` function is a logical OR operator for matchers. It takes an array of matchers and triggers when any of the conditions are met. For example, to match either a `PUT` or a `PATCH` request, you can use the following code:

```python
from jj.http import PATCH, PUT

jj.match_any([
    jj.match_method(PUT),
    jj.match_method(PATCH),
])
```

With this configuration, your mock will respond to either a `PUT` or a `PATCH` request.

### Matching All Given Conditions

Conversely, `match_all` serves as the logical AND operator for matchers. It takes an array of matchers and triggers only if all conditions are met. For instance, you can configure a mock to respond only when it receives a request that meets specific conditions for method, path, parameters, and headers:

```python
jj.match_all([
    jj.match_method("*"),
    jj.match_path("/"),
    jj.match_params({"locale": "en_US"}),
    jj.match_headers({"x-request-id": "0fefbf48"}),
])
```

This complex mock will activate only when all of the specified conditions are met.

### The One-Liner for Multiple Conditions

JJ also provides a convenient shorthand method named `match`. This function is essentially a quick way to specify multiple conditions in a single line:

```python
jj.match("*", "/", params={"locale": "en_US"}, headers={"x-request-id": "0fefbf48"})
```

In this example, the matcher will activate for any HTTP method, as long as the path is `/`, the locale query parameter is set to `en_US`, and the `x-request-id` header has the value `0fefbf48`.
