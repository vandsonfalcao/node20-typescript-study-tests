import { createServer } from "node:http";
import url from "node:url";
import { parseHTTPMethod } from "./helpers/parseHTTPMethod";
import { loggerMiddleware } from "./http/middlewares/loggerMiddleware";
import { notFound, routes } from "./routes";

// Run
const port = process.env.PORT || 3333;

const server = createServer({}, async (request, response) => {
	const parsedUrl = url.parse(request.url ?? "", true);
	const query = parsedUrl.query;
	const path = parsedUrl.pathname ?? "";
	const method = parseHTTPMethod(request.method);

	let handler = routes[path] && routes[path][method];
	if (!handler) {
		const routeKeys = Object.keys(routes).filter((key) => key.includes(":"));

		const matchedKey = routeKeys.find((key) => {
			// replacing each segment of the key that starts with a colon (:)
			const regex = new RegExp(`^${key.replace(/:[^/]+/g, "([^/]+)")}$`);
			return regex.test(path);
		});

		if (matchedKey) {
			const regex = new RegExp(`^${matchedKey.replace(/:[^/]+/g, "([^/]+)")}$`);
			const dynamicParams = (regex.exec(path) ?? []).slice(1);
			const dynamicHandler = routes[matchedKey][method];
			const paramKeys = (matchedKey.match(/:[^/]+/g) ?? []).map((key) => key.substring(1));
			const params = dynamicParams.reduce(
				(acc, val, i) => ({ ...acc, [paramKeys[i]]: val }),
				{}
			);

			// set params in req
			// request.params = params;
			handler = dynamicHandler;
		}
	}

	// url and method not match
	if (!handler) {
		handler = notFound;
	}

	// set query string in req
	// request.query = {};

	// for (const key in query) {
	// 	request.query[key] = query[key];
	// }

	handler(request, response);
});

// global middleware
server.on("request", (request, response) => {
	loggerMiddleware(request, response);
});

server.listen(port, () => console.log(`listen on ${port}`));
