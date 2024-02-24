# Disposable Mocks

Disposable mocks are temporary and exist only within a `with` block context. This type of mock is ideal for tests where the mock's lifespan should be limited to a specific scope.

**Example Usage:**

```python
import jj
from jj.mock import mocked

matcher = jj.match("GET", "/users")
response = jj.Response(status=200, json=[])

async with mocked(matcher, response) as mock:
    # Inside this block, the mock is active.
# Outside the block, the mock is no longer available.
```

#### Accessing History for Disposable Mocks

The [history](/docs/history) of a disposable mock can be accessed immediately after exiting the `with` block.

```python
async with mocked(matcher, response) as mock:
    ...
print(mock.history)
```
