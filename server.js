require('dotenv').config();
const app = require('./app');
const PORT=process.env.PORT||8080

app.listen(PORT, (err) => {
	console.log('Server connection success!');
});
