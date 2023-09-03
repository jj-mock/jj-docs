# Delayed Response

The `DelayedResponse` is an extension of the regular [Response](./response) class. It allows you to not only set the response status, body, and headers but also introduces a delay before sending the response.

Here's a basic example:

```python
jj.DelayedResponse(json=[], delay=5.0)
```

This feature can be incredibly valuable for testing how your application handles delayed API responses, ensuring that it performs as expected in such scenarios.
