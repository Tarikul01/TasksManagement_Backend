require('dotenv').config();
const app = require('./app');
const PORT=process.env.PORT||5000

app.listen(PORT, (err) => {
	if(!err){
		
	console.log('Server connection success!',PORT);
	}else{
		console.log("Server connection fail ",err)
	}
});
