---
id: request-matchers
---
# Request Matchers

## Matching HTTP Methods

### Matching Single Method

The `match_method` function allows you to specify the HTTP method that an incoming request must use to match the mock. For example, to match a `GET` request, you can use the following code:

```python
from jj.http.methods import GET

jj.match_method(GET)
```

This means the matcher will only activate for HTTP GET requests.

:::info
To match any HTTP method, use the wildcard `*`

```python
jj.match_method("*")
```
:::

### Matching Multiple Methods

If you want to match multiple HTTP methods, use the `match_methods` function:

```python
from jj.http.methods import PUT, PATCH

jj.match_methods(PUT, PATCH)
```

With this setup, your mock will respond to either a `PUT` or `PATCH` request.

## Matching URL Paths

### Matching Exact Paths

To match a request's URL path, use the `match_path` function. For example, to match a request to `/users`:

```python
jj.match_path("/users")
```

### Matching Dynamic Segments

JJ also supports dynamic path matching using segments. For instance, to match any user ID in the `/users/{user_id}` path:

```python
jj.match_path("/users/{user_id}")
```

:::tip
For additional information on segment matching, refer to the [aiohttp documentation](https://docs.aiohttp.org/en/stable/web_quickstart.html#variable-resources)
:::

## Matching Query Parameters

### Matching Single Parameter

To match a single query parameter in the URL, use the `match_param` function:

```python
jj.match_param("locale", "en_US")
```

This will match requests where the `locale` parameter is set to `en_US`.

### Matching Multiple Parameters

To match multiple query parameters, you can use the `match_params` function:

```python
jj.match_params({"locale": "en_US", "timezone": "UTC"})
```

## Matching HTTP Headers

### Matching Single Header

JJ allows you to match incoming requests based on specific HTTP headers using the `match_header` function:

```python
jj.match_header("X-Forwarded-Proto", "https")
```

This will match requests that have the `X-Forwarded-Proto` header set to `https`.

### Matching Multiple Headers

To match multiple headers, use the `match_headers` function:

```python
jj.match_headers({
    "x-user-id": "1432",
    "x-client-id": "iphone",
})
```
