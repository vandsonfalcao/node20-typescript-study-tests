import { Request } from "../types/ServerConfig";

// Returns a promise that resolves with the parsed JSON data of the request body.
export const extractBody = (request: Request) => {
	return new Promise((resolve, reject) => {
		let body = "";

		request.on("data", (chunk) => {
			body += chunk;
		});

		request.on("end", () => {
			try {
				body = body ? JSON.parse(body) : {};

				resolve(body);
			} catch (error) {
				reject(error);
			}
		});
	});
};