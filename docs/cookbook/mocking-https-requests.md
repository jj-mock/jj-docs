# Mocking HTTPS Requests

This recipe demonstrates how to configure the JJ Mock server to handle HTTPS requests using a proxy.

## Docker Setup

First, configure Docker to run both the JJ Mock server and an SSL proxy.

```yaml
services:
  mock:
    image: vedrouniverse/jj
    ports:
      - "8080:80"

  proxy:
    image: fsouza/docker-ssl-proxy:1.6
    environment:
      TARGET_HOST: mock
      TARGET_PORT: 80
    ports:
      - "4443:443"
```

The proxy forwards HTTPS requests on port 4443 to the JJ mock server. By default, this configuration uses a self-signed SSL certificate.

:::tip
You can configure custom SSL certificates with the `docker-ssl-proxy` image by mounting your custom certificates into the container. For more details, refer to the [SSL Proxy documentation](https://github.com/fsouza/docker-ssl-proxy).
:::

## Testing HTTPS Request Handling

This section demonstrates how to test and ensure that the JJ mock server and proxy setup are functioning correctly with HTTPS requests. The following Python example uses the `httpx` library to perform the test.

```python
import asyncio
import httpx
import jj
from jj.mock import mocked

async def main():
    # Define a matcher and response
    matcher = jj.match("GET", "/users")
    response = jj.Response(status=200, json=[])

    # Set up the mock with the matcher and response
    async with mocked(matcher, response):
        # Use httpx to send an HTTPS request, bypassing SSL verification
        async with httpx.AsyncClient(verify=False) as client:
            response = await client.get("https://localhost:4443/users")
            print("Response:", response.status_code, response.json())

asyncio.run(main())
```

**Explanation**

- **Matcher:** The matcher is defined to intercept `GET` requests to the `/users` endpoint.
- **Response:** A mock response is returned with a 200 status code and an empty JSON array.
- **HTTPX Client:** The HTTPX client is used to send an HTTPS request to the mock server through the proxy, with SSL verification disabled (`verify=False`).

## Running the Mock Server

To start the Docker services:

```shell
$ docker-compose up
```

This will launch both the mock server and the SSL proxy.

## Running the Python Script

Once the services are up, run the following command to execute the script:

```shell
$ python3 main.py
```

**Expected Output**

You should see a response indicating that the mock has successfully intercepted the HTTPS request:

```
Response: 200 []
```
