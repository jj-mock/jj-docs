# Expiration Policy

Expiration policies in HTTP mocking allow developers to simulate how an API might respond differently over time or after a certain number of requests. This feature is particularly useful in testing scenarios where the behavior of an API changes, such as rate limiting, temporary outages, or conditional responses based on request count.

## ExpireAfterRequests Policy

The `ExpireAfterRequests` policy enables a mocked response to expire after a specified number of requests. Once expired, any subsequent requests will not match the mocked response, potentially triggering a different behavior or response as defined in your testing setup.

### Basic Example

Consider the following basic example where we want to test how our application handles a scenario where an endpoint `/users` is available on the first request but becomes unavailable on the second request.

```python
import httpx
import jj
from jj.expiration_policy import ExpireAfterRequests

matcher = jj.match("*", "/users")
response = jj.Response(status=200, json=[])

# Mock the endpoint with an expiration policy
with mocked(matcher, response, expiration_policy=ExpireAfterRequests(1)):
    # First request matches and gets a 200 response
    res1 = httpx.get("http://localhost:8080/users")
    # Second request does not match as the mock has expired, resulting in a 404
    res2 = httpx.get("http://localhost:8080/users")

assert res1.status_code == 200
assert res2.status_code == 404
```

In this example, `res1` receives a 200 status code because it matches the mocked response. However, `res2` receives a 404 status code because the mock expired after the first request.

### Advanced Use Cases

The `ExpireAfterRequests` policy can be used to simulate more complex scenarios, such as an API endpoint that temporarily fails and then recovers.

To simulate an endpoint that fails on the first request but succeeds on subsequent requests:

```python
import httpx
import jj
from jj.expiration_policy import ExpireAfterRequests

# Define a matcher for the endpoint
matcher = jj.match("*", "/users")

# Define the expiration policy
policy = ExpireAfterRequests(1)

# Create responses for failure and success scenarios
response1 = jj.Response(status=500, json={"error": "message"})
response2 = jj.Response(status=200, json=[{"id": 1}])

# Mock the endpoint with the responses and expiration policy
with mocked(matcher, response2, expiration_policy=policy):
    with mocked(matcher, response1, expiration_policy=policy):
        # First request triggers the failure response
        res1 = httpx.get("http://localhost:8080/users")
        # Second request matches the success response
        res2 = httpx.get("http://localhost:8080/users")

# Verify the responses
assert res1.status_code == 500
assert res2.status_code == 200
```

**Note:** When using nested `with mocked` statements, the inner `with mocked` takes precedence over the outer one. This allows for more specific mocking behavior within a broader mocking context, as demonstrated in the example above where the first request is intentionally failed with a 500 status code before succeeding with a 200 on the subsequent request.
