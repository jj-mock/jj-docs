# Persistent Mocks

Persistent mocks remain active until they are explicitly deregistered. This type is useful for scenarios where the mock needs to persist across multiple test cases or parts of the application.

**Example Usage:**

```python
import jj
from jj.mock import mocked

matcher = jj.match("GET", "/users")
response = jj.Response(status=200, json=[])

mock = await mocked(matcher, response)
```

#### Fetching History for Persistent Mocks

To access the history of a persistent mock, you must explicitly fetch it.

```python
mock = await mocked(matcher, response)

history = await mock.fetch_history()
print(history)
```
