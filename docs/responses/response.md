# Response

## Setting Response Status

JJ makes it easy to set the HTTP status code for your mock response. If you're testing a scenario where a resource is not found, you might want to return a 404 status code.

```python
jj.Response(status=404)
```

By explicitly setting the `status` parameter, you can emulate various server responses, helping you to test edge cases in your application.

:::info
To customize the reason phrase, use the `reason` attribute:
```python
jj.Response(status=404, reason="Custom Reason")
```
:::

## Crafting the Response Body

JJ provides various options for setting the response body, ranging from simple text and JSON to binary data.

### JSON Response

To return a JSON response, utilize the `json` parameter. This will also automatically set the `Content-Type` header to `application/json`.

```python
jj.Response(json={"message": "200 OK"})
```

### Text Response

To return plain text, utilize the `text` parameter.

```python
jj.Response(text="200 OK")
```

### Binary Response

To simulate responses with binary data like images or files, use the `body` parameter with a bytes object.

```python
jj.Response(body=b"<binary>")
```

### Predefined Body

JJ also lets you populate the response body using a file. This is particularly useful for loading predefined mock data.

```python
jj.Response(body=open("responses/users.json", "rb"))
```

## Setting Response Headers

In addition to crafting the response body, JJ also allows you to set custom headers for your mock responses.

```python
jj.Response(body="<p>text<p>", headers={"Content-Type": "text/html"})
```

In this example, the `Content-Type` header is explicitly set to `text/html`, indicating the type of the response content.
