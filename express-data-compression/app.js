const express = require('express');
const compression = require('compression');

const port = 3000;
const fileConfig = { root: __dirname };
const app = express();

function compressionFilter(req) {
	const compressed = req.route.path === '/compressed';

	console.log(`Compression: ${req.route.path} : ${compressed}`);

	return compressed;
}

app.use(compression({
	filter: compressionFilter,
	threshold: 0
}));

app.get('/compressed', (req, res) => {
	res.sendFile('./html/index.html', fileConfig);
});

app.get('/not-compressed', (req, res) => {
	res.sendFile('./html/index.html', fileConfig);
});

app.listen(port, () => console.log(`started on port ${port}`));
