# Mock Inspection

## Inspecting Registered Mocks

After setting up a mock with JJ, you can easily view detailed information about all registered remote handlers by navigating to a special endpoint provided by the JJ server.

### Endpoint

```
/__jj__/handlers
```

This endpoint lists all the currently registered handlers, including their matchers and responses.

### Example Mock

To illustrate, let's register a mock for a `GET` request to `/users` that returns a JSON response:

```python
import jj
from jj.mock import mocked

matcher = jj.match("GET", "/users")
response = jj.Response(status=200, json=[{"id": 1, "name": "Bob"}])

mock = await mocked(matcher, response)
```

### Inspection Output

Accessing the `/__jj__/handlers` endpoint after setting up the above mock will yield JSON output similar to the following, providing a comprehensive overview of the mock's configuration:

```json
[
    {
        "id": "28a404c1-edfe-49c0-9fcc-17cd56b39c72",
        "registered_at": "2024-03-16T10:13:28.175434",
        "expiration_policy": null,
        "matcher": {
            "AllMatcher": {
                "matchers": [
                    {
                        "MethodMatcher": {
                            "method": {
                                "EqualMatcher": {"expected": "GET"}
                            }
                        }
                    },
                    {
                        "PathMatcher": {
                            "path": {
                                "RouteMatcher": {"path": "/users"}
                            }
                        }
                    }
                ]
            }
        },
        "response": {
            "Response": {
                "status": 200,
                "reason": "OK",
                "headers": [
                    ["Content-Type", "application/json"],
                    ["Server", "jj/2.10.0 via aiohttp/3.9.3"]
                ],
                "cookies": [],
                "body": [
                    {
                        "id": 1,
                        "name": "Bob"
                    }
                ],
                "chunked": false,
                "compression": null
            }
        }
    }
]
```

## Viewing Request History

JJ also provides the ability to inspect the history of requests matched by each handler, allowing you to see the exact requests that triggered the mock responses and the details of those responses.

### Endpoint

```
/__jj__/handlers/{handler_id}/history
```

Replace `{handler_id}` with the ID of the handler whose history you want to inspect.

### Example Output

For the previously mentioned mock, accessing its history might produce output similar to this:

```json
[
    {
        "request": {
            "HistoryRequest": {
                "method": "GET",
                "path": "/users",
                "segments": {},
                "params": [
                    ["id", "1"]
                ],
                "headers": [
                    ["Host", "localhost:8080"],
                    ["Accept", "*/*"],
                    ["User-Agent", "python-httpx/0.27.0"]
                ],
                "body": "b''",
                "raw": "b''"
            }
        },
        "response": {
            "HistoryResponse": {
                "status": 200,
                "reason": "OK",
                "headers": [
                    ["Content-Type", "application/json"],
                    ["Server", "jj/2.10.0 via aiohttp/3.9.3"],
                    ["Content-Length", "26"],
                ],
                "body": [
                    {
                        "id": 1,
                        "name": "Bob"
                    }
                ],
                "raw": "b'[{\"id\": 1, \"name\": \"Bob\"}]'"
            }
        },
        "created_at": "2024-03-16T10:13:29.096847"
    }
]
```

The introspection capabilities of JJ greatly enhance the testing and debugging process, giving developers clear insights into the behavior of their mocks and the interactions between the tests and the application under test.
