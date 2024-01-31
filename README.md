# 👷 `worker-template` Hello World

A template for kick starting a Cloudflare worker project.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

#### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).



## Commands used 

# Install Cloudflare Wrangler
```bash
npm install -g @cloudflare/wrangler - old

npm install -g wrangler

```

# Create a worker project using wrangler
```bash
wrangler generate serverless-api
``` 

# Login to Cloudflare

```bash
wrangler login
```

- A link opens in browser then just do as it says and grant permission


# Login Check

```bash 
wrangler whoami
```

- Paste the account id into wrangler.toml


# To deploy

```bash
wrangler deploy "index.js"
```
This will seamlessly deploy your api

# Process incoming request data using request class in workers

```bash index.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  const { query } = await request.json()
  return new Response(`Your response was ${query}`)
}
 
```

## Keep server running using command (Run)

```bash
  wrangler dev "index.js"

```


## Send request in other terminal

```bash linux curl
curl -H "Content-type: application/json" -d '{"query": "guitar"}' http://127.0.0.1:8787

```

```bash windows
$body = @{
    query = "guitar"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://127.0.0.1:8787" -Method POST -Body $body -Headers @{
    "Content-Type" = "application/json"
}


```


# Make requests in workers function using fetch api

## Make unsplash dev account and create an app to access keys


```bash index.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with Unsplash photos using the Unsplash API
 * @param {Request} request
 */
async function handleRequest(request) {
  const CLIENT_ID = ""; // Replace with your Unsplash API Client ID

  try {
    const resp = await fetch("https://api.unsplash.com/photos", {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    });

    if (!resp.ok) {
      throw new Error(`Unsplash API request failed with status: ${resp.status}`);
    }

    const data = await resp.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: {
        'Content-type': 'text/plain',
      },
    });
  }
}

 


```


## Run server 

```bash
 wrangler dev "index.js"
 ```

 ## Run request 

 ```bash
 Invoke-WebRequest -Uri "http://127.0.0.1:8787"
 ```

 # Using Workers secrets to securely store API Credentials

```bash
 wrangler secret put CLIENT_ID

```

```bash
wrangler publish "index.js"
```

- Now we can access   https://serverless-api.username.workers.dev




