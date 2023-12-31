// Dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// Database, GraphQL, Utility imports
const db = require("./config/connection.js");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

// Server setup
const PORT = process.env.PORT || 3001;
const app = express();

// GraphQL setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
});
//server.applyMiddleware({ app });
async function startServer() {
	// Start the Apollo Server
	await server.start();
	// Apply middleware to the server
	server.applyMiddleware({
		app,
	});
}

// Call the startServer function to start the server and apply middleware
startServer().catch((error) => {
	console.error("Error starting the server:", error);
});

// Middleware
// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Start database connection and server
db.once("open", () => {
	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`);
		console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
	});
});
