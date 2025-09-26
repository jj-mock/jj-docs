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

**Accessing History for Disposable Mocks**

The [history](/docs/history) of a disposable mock can be accessed immediately after exiting the `with` block:

```python
async with mocked(matcher, response) as mock:
    ...
print(mock.history)
```

## Using Mocked as a Decorator

The `@mocked` decorator can be applied to test functions to automatically manage the mock lifecycle:

```python
import jj
from jj.mock import mocked

@mocked(
    matcher=jj.match("GET", "/users")
    response=jj.Response(status=200, json=[])
)
async def test_users():
    # The mock is active for the entire function
    users = await fetch_users()  # This will receive the mocked response
    assert users == []
```

## Using with_mock Decorator

The `@mocked.with_mock` decorator injects the mock instance as the first argument to the decorated function, allowing direct access to the mock for assertions:

```python
import jj
from jj.mock import mocked, Mocked

@mocked.with_mock(
    matcher=jj.match("GET", "/users")
    response=jj.Response(status=200, json=[])
)
async def test_with_mock_access(mock: Mocked):
    # The mock instance is injected as the first parameter
    users = await fetch_users()

    history = await mock.fetch_history()
    assert len(mock.history) == 1
```
