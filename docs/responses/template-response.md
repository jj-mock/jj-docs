# Template Response

The `TemplateResponse` class provides a flexible way to define dynamic HTTP responses using [Jinja2](https://jinja.palletsprojects.com) templates. It allows you to craft responses whose body, headers, and status code can be rendered dynamically based on the incoming request's context.

This is particularly useful for scenarios where different request attributes (such as URL segments, headers, or query parameters) need to affect the structure of the response.

:::info
To use the `TemplateResponse` class, make sure to install the [Jinja2](https://pypi.org/project/Jinja2/) library separately as it is an optional dependency:
```shell
$ pip install Jinja2
```
:::

## Setting Up TemplateResponse

Here’s how you can create a `TemplateResponse` and mock a route in JJ:

```python
matcher = jj.match("GET", "/users/{user_id}")
response = jj.TemplateResponse(
    """
    {
        "id": "{{ request.segments['user_id'] }}",
        "name": "User-{{ request.segments['user_id'] }}"
    }
    """,
    headers={"Content-Type": "application/json"}
)

await mocked(matcher, response)
```

In this example, the mock will respond to a GET request at `/users/1` with the following JSON:

```json
{
    "id": "1",
    "name": "User-1"
}
```

### Body Templating

You can dynamically generate the response body by embedding placeholders into your template using Jinja2 syntax. Here's an example where the body uses query parameters:

```python
jj.TemplateResponse(
    body="<p>Hello, {{ request.query['name'] }}!</p>",
    headers={"Content-Type": "text/html"}
)
```

If the request contains the query parameter `?name=JJ`, the response body will be:

```html
<p>Hello, JJ!</p>
```

### Headers Templating

You can also template the response headers based on the incoming request:

```python
jj.TemplateResponse(headers={
    "X-Correlation-ID": "{{ request.headers['X-Correlation-ID'] }}"
})
```

In this case, the `X-Correlation-ID` header in the request will be copied into the response headers.

### Status Code Templating

You can even define the response status code dynamically:

```python
jj.TemplateResponse(
    status="{{ 200 if request.method == 'GET' else 405 }}"
)
```

This example sets the status code to 200 for `GET` requests, and 405 (Method Not Allowed) for other methods.

## Advanced Use Cases

For more examples of advanced templating use cases, consult the [Jinja2 documentation](https://jinja.palletsprojects.com/templates/) to learn about the full range of templating capabilities available.
