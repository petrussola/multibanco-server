// dependencies
const express = require('express');

// routes
const sourcesRoute = require('./Routes/sources');

// initialise server
const server = express();

// middleware
server.use(express.json());

// routes
server.get('/', (req, res) => {
	res.status(200).json({ message: 'works' });
});

server.use('/sources', sourcesRoute);

const port = process.env.PORT || 5000;

server.listen(port, () => {
	console.log(`\n\nServer listening on port ${port}\n\n`);
});
