import { Request, Response } from "../../types/ServerConfig";
export const loggerMiddleware = (request: Request, _: Response) => {
	console.log(`${request.method} ${request.url}`);
};
