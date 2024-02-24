# Relay Response

`RelayResponse` is designed to forward incoming requests to a specified target URL. It is particularly useful for creating proxy mocks to test real server responses without directly hitting the target server. This enables seamless testing against external services by relaying responses from a target URL back to the client.

### Usage

To use `RelayResponse`, define a matcher for the requests to be forwarded and specify the target URL:

```python
matcher = jj.match("GET")
response = jj.RelayResponse(target="https://httpbin.org")
```

With this setup, all GET requests to your mock server are forwarded to `https://httpbin.org`, and the responses are relayed back to the original requester. For example:

- `GET http://localhost:8080/html` is forwarded to `GET https://httpbin.org/html`.
- `GET http://localhost:8080/status/500` is forwarded to `GET https://httpbin.org/status/500`.
