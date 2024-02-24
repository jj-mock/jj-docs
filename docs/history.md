# History

## History Format

The history is a list of `HistoryItem` instances, where each `HistoryItem` is a `TypedDict` with the following structure:

- **request**: `HistoryRequest`
- **response**: `HistoryResponse`
- **tags**: `list[str]`

#### `HistoryRequest` Class

Represents the request part of the history item with these attributes:

- **method**: `str` - The HTTP method used.
- **path**: `str` - The HTTP path requested.
- **params**: `MultiDict[str]` - The query parameters.
- **headers**: `MultiDict[str]` - The request headers.
- **raw**: `bytes` - The raw body of the request.
- **body**: `Any` - The parsed body. This will be a string for `text/plain` content types and a JSON-like structure for `application/json`.

#### `HistoryResponse` Class

Represents the response part of the history item with these attributes:

- **status**: `int` - The HTTP status code.
- **reason**: `str` - The reason phrase associated with the status code.
- **headers**: `MultiDict[str]` - The response headers.
- **raw**: `bytes` - The raw body of the response.
- **body**: `Any` - The parsed body. Similar to `HistoryRequest`, the format depends on the content type of the response.

#### Customizing Body Parsing

To customize how the body is parsed, especially in cases where the default handling for `text/plain` or `application/json` does not meet specific requirements, users can utilize a custom history adapter. This flexibility allows for tailored processing of request and response bodies, accommodating various content types and parsing needs.

Refer to the [history_adapter](https://github.com/jj-mock/jj/blob/master/jj/mock/_history/_history_adapter.py) module within the `jj` library for implementing custom parsing logic.
