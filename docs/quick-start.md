---
id: quick-start
---
# Quick Start

[JJ](https://pypi.org/project/jj/) is a remote HTTP mock library that simulates HTTP responses for incoming requests. It allows you to define conditions for incoming HTTP requests and specify the responses that should be returned. 

The library uses a client-server architecture, making it possible to run a server locally or deploy it somewhere remotely. 

<p style={{ textAlign: "center" }}>
    <img src={require("./client-server-arch.png").default} width="350px" />
</p>

## Starting the Server

Before creating mocks, you need to ensure the JJ server is up and running.

```python
import jj
from jj.mock import Mock

jj.serve(Mock(), port=8080)
```

Alternatively, you can run the server using [Docker](https://www.docker.com/) with the following command:

```shell
$ docker run -p 8080:80 vedrouniverse/jj
```

Either of these methods will start the JJ server, ready to handle incoming mock requests at `http://localhost:8080`.

## Writing Your First Mock

Once the server is running, you can define the matchers (rules) and responses that JJ should use. Here's an example:

```python
import sh
import jj
from jj.mock import mocked

def test_curl():
    matcher = jj.match("GET", "/users")
    response = jj.Response(status=200, json=[])

    with mocked(matcher, response) as mock:
        res = sh.curl("-s", "http://localhost:8080/users")

    assert res == "[]"
```

## Breaking Down the Concepts

Let's delve deeper into the key elements.

### 1. Matcher

The Matcher is the cornerstone of any mock you set up. It specifies what conditions an incoming HTTP request must satisfy for the mock to be used.

```python
matcher = jj.match("GET", "/users")
```

In this example, the matcher will look for HTTP GET requests aimed at the `/users` URL path.

### 2. Response

The Response object is what JJ returns when the conditions specified in the Matcher are met:

```python
response = jj.Response(status=200, json=[])
```

In this example, when a match occurs, the server will return an HTTP 200 status code along with an empty JSON array as the response body.

### 3. Remote Handler

In JJ, a remote handler is essentially a pair consisting of a matcher and a response. The `mocked` context manager takes care of registering this pair.

```python
with mocked(matcher, response) as mock:
    res = sh.curl("-s", "http://localhost:8080/users")
```

The mock is registered upon entering the `with` block and deregistered upon exiting it. This means it matches requests only within this block.

## Flexibility in Deployment

Since JJ uses HTTP for client-server communication, it offers extreme flexibility in deployment options. You can run all the components—mock server, application under test, and test script—in a single process, separate threads, or even distribute them across multiple machines. This makes it a great fit for both small and large-scale testing environments.
