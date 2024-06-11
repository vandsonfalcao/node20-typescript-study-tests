import { RequestListener } from "node:http";
import { EnumHTTPVerbs } from "../types/httpVerbs";

type Methods = { [key in EnumHTTPVerbs]?: RequestListener };
type Routes = Record<string, Methods>;
export const routes: Routes = {
	"/": {
		GET: (_, response) => {
			return response.end("running!");
		},
	},
	"/test": {
		GET: (request, response) => {
			return response.end("aaaaaaaaaa!");
		},
	},
	"/test/:id": {
		GET: (request, response) => {
			return response.end(request.url);
		},
	},
};

export const notFound: RequestListener = (_, response) => {
	response.writeHead(404);
	return response.end("not found");
};
