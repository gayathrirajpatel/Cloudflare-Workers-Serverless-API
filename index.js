addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with Unsplash photos using the Unsplash API
 * @param {Request} request
 */
async function handleRequest(request) {

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

 