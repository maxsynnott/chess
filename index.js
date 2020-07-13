const express = require('express')

const app = express()

app.get('/', (req, res) => {
	res.send('Hello World!')
})


app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err)
})

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	})
})


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server listening at port ' + port)
})