import { createServer } from "node:http";

// Run
const port = process.env.PORT || 3333;

const server = createServer({}, async (request, response) => {
	if (request.url === "/ok") {
		response.writeHead(200, { "Content-Type": "text/plain" });
		return response.end("ok!");
	}

	response.writeHead(200, { "Content-Type": "text/plain" });
	return response.end("Server is running\n");
});

server.listen(port, () => console.log(`listen on ${port}`));
