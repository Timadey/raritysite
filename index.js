const express = require('express');
const { port, nft } = require('./config.json');

const app = express();

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

// app.get('/', (request, response) => {
// 	return response.sendFile('index.html', { root: '.' });
// });

app.get('/:nft', (request, response) => {
    nft_page = request.params.nft
	return response.sendFile(`${nft_page}.html`, { root: 'main' });
});

// Routes
app.use('/auth/discord', require('./auth/discord'));

// Errors
app.use((err, req, res, next) => {
    switch (err.message) {
      case 'NoCodeProvided':
        return res.status(400).send({
          status: 'ERROR',
          error: err.message,
        });
      default:
        return res.status(500).send({
          status: 'ERROR',
          error: err.message,
        });
    }
  });

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));