const mongoose = require("mongoose");

mongoose
	.connect("mongodb+srv://ndeta:Theeye10@myblog.ugv3lly.mongodb.net/", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to the MongoDB database");
		// Continue with your code
	})
	.catch((error) => {
		console.error("Error connecting to the MongoDB database:", error);
		// Handle the error
	});

module.exports = mongoose.connection;
