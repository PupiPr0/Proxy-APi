export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);

  if (url.pathname.startsWith('/api/')) {
    url.hostname = 'api.dkon.app';

    const newRequestOptions = {
      method: req.method,
      headers: req.headers,
      body: req.method === 'POST' ? req.body : null,
    };

    try {
      const response = await fetch(url.toString(), newRequestOptions);
      const data = await response.text();

      res.status(response.status);
      response.headers.forEach((value, name) => {
        res.setHeader(name, value);
      });

      res.send(data);
    } catch (error) {
      console.error('Error fetching the API:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send(`
      <html>
        <head><title>400 Bad Request</title></head>
        <body>
          <center><h1>400 Bad Request</h1></center>
          <hr><center>dragenx</center>
        </body>
      </html>
    `);
  }
}
