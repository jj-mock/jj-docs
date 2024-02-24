# Low Level API

The Low Level API in JJ provides direct access to the core functionalities, enabling fine-grained control over request matching, response handling, and interaction with remote mocks. 

## Registering and Deregistering

Below is a step-by-step example demonstrating how to use the Low Level API to mock HTTP requests:

```python
import jj
from jj.mock import RemoteMock

# Instantiate a RemoteMock pointing to the desired mocking server
remote_mock = RemoteMock("http://localhost:8080")

# Define the request matcher and the response
matcher = jj.match("GET", "/users")
response = jj.Response(status=200, json=[])

# Create and register a handler with the matcher and response
remote_handler = remote_mock.create_handler(matcher, response)
await remote_handler.register()

# Upon a GET request to /users, the mock will return a 200 status and an empty array

# When the mock is no longer needed, deregister the handler
await remote_handler.deregister()
```

:::tip

The default URL for the remote mock server is available via the `jj.mock.REMOTE_MOCK_URL` variable. This URL can be customized by setting the `JJ_REMOTE_MOCK_URL` environment variable to your desired endpoint.

:::

## Resetting Mock

In scenarios where you need to clear all configurations and return the mock server to its initial state, the Low Level API provides a straightforward method to reset the mock. This is particularly useful during testing phases where a clean state is required before starting new tests.

Here's an example of how to reset a mock:

```python
from jj.mock import RemoteMock, REMOTE_MOCK_URL

# Instantiate a RemoteMock pointing to the mocking server
remote_mock = RemoteMock(REMOTE_MOCK_URL)

# Prior registrations of handlers and interactions with the mock server...

# Reset the mock server to its initial state
await remote_mock.reset()

# After resetting, the mock server has no registered handlers
# and is ready for new interactions as if it was just started.
```
