# Stacked Mocks

When working with multiple mocks in JJ, managing them individually can become cumbersome, especially when they need to be active simultaneously. The `stacked()` context manager simplifies this by allowing you to stack multiple mocks into a single context manager. This ensures that all the specified mocks are registered upon entering the context and deregistered upon exiting, making your code cleaner and more maintainable.

## Basic Usage

The `stacked()` context manager can accept a list of mocks and return them as a tuple. This is useful when you have multiple mocks that you want to activate together.

**Example**

```python
import jj
from jj.mock import mocked, stacked

def mocked_user():
    matcher_token = jj.match("GET", "/auth/token")
    response_token = jj.Response(json={"token": "banana"})

    matcher_user = jj.match("GET", "/users/1")
    response_user = jj.Response(json={"id": 1, "name": "Bob"})

    return stacked([
        mocked(matcher_token, response_token),
        mocked(matcher_user, response_user)
    ])

async with mocked_user() as (token_mock, user_mock):
    # Your test code that makes requests to /auth/token and /users/1
    ...

# After exiting the context, you can access the history of each mock
assert len(token_mock.history) == 1
assert len(user_mock.history) == 1
```

In this example:

- **Matchers and Responses:** Two separate matchers and responses are defined for the `/auth/token` and `/users/{user_id}` endpoints.
- **Stacked Mocks:** The `stacked()` function wraps both mocks into a single context manager.
- **Using the Mocks:** Within the `async with` block, both mocks are active, and any requests matching the defined matchers will receive the specified responses.
- **Accessing Histories:** After exiting the context, you can access the `history` attribute of each mock to verify how many times they were called.

## Named Mocks

The `stacked()` context manager also supports using a dictionary to name each mock. This can make your code more readable and allow you to access mocks by name.

**Example**

```python
import jj
from jj.mock import mocked, stacked

def mocked_user():
    matcher_token = jj.match("GET", "/auth/token")
    response_token = jj.Response(json={"token": "banana"})

    matcher_user = jj.match("GET", "/users/1")
    response_user = jj.Response(json={"id": 1, "name": "Bob"})

    return stacked({
        "token": mocked(matcher_token, response_token),
        "user": mocked(matcher_user, response_user)
    })

async with mocked_user() as mocks:
    # Your test code that makes requests to /auth/token and /users/1
    ...

# After exiting the context, you can access each mock by name
assert len(mocks["token"].history) == 1
assert len(mocks["user"].history) == 1
```

In this example:

- **Named Mocks:** The mocks are stored in a dictionary passed to `stacked()`, allowing you to reference each mock by a descriptive name.
- **Using the Mocks:** Within the `async with` block, both mocks are active as before.
- **Accessing Histories:** After exiting the context, you can access each mock's `history` using the names provided in the dictionary.

## Benefits

- **Simplifies Mock Management**: Instead of nesting multiple `with` statements or manually managing multiple mocks, `stacked()` allows you to handle them in a clean and organized way.
- **Access to Individual Mocks**: You can still access each mock individually to inspect histories or perform assertions.
- **Flexible**: Supports both list and dictionary inputs, allowing you to choose between ordered or named mocks based on your needs.
