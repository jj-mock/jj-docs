# Detailed Logging

By default, the mock server logs basic information, showing the HTTP method and path for requests, and the status code for responses. For example:

```
-> GET /users
<- 200 OK
```

## Customizing Log Output

The output of the logs can be customized by setting the `JJ_LOG_FORMAT` environment variable:

```shell
export JJ_LOG_FORMAT='-> $req_method $req_path?$req_query\n$req_headers\n<- $res_code'
```

This configuration includes the request method, path, query parameters, request headers, and the response status code in the log output. For instance:

```
-> GET /users?id=1&is_deleted=false
 Host: localhost:8080
 Accept: */*
 Accept-Encoding: gzip, deflate
<- 200
```

### Supported Variables

The `JJ_LOG_FORMAT` environment variable supports placeholders for dynamic content:

| Variable        | Description                                  | Examples                             |
|-----------------|----------------------------------------------|--------------------------------------|
| `$req_method`   | HTTP request method                          | `GET`, `POST`                        |
| `$req_path`     | Path of the request                          | `/users`                             |
| `$req_query`    | Query string of the request                  | `id=1&is_deleted=false`              |
| `$req_headers`  | Headers included in the request              | `User-Agent: Mozilla/5.0`            |
| `$res_code`     | HTTP status code of the response             | `200`, `404`                         |
| `$res_reason`   | Reason phrase associated with the status code| `OK`, `Not Found`                    |
| `$res_headers`  | Headers included in the response             | `Content-Type: application/json`     |
| `$res_body`     | Body of the response                         | `b'[{"id": 1, "name": "Bob"}]'`      |


## Limiting Body Output

Logging the entire response body might not always be preferred, especially for large bodies. The response body's logged character count can be limited by setting the `JJ_LOG_BODY_LIMIT` environment variable:

```shell
export JJ_LOG_BODY_LIMIT=512
```

This configuration truncates the logged response body to the specified number of characters, ensuring log output remains concise and focused on relevant information.
