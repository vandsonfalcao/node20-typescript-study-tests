import { HTTPVerb } from "../types/httpVerbs";

export const parseHTTPMethod = (method?: string | undefined): HTTPVerb => {
	if (method && method !== "") {
		switch (method.toUpperCase()) {
			case "CONNECT":
				return "CONNECT";
				break;
			case "DELETE":
				return "DELETE";
				break;
			case "HEAD":
				return "HEAD";
				break;
			case "OPTIONS":
				return "OPTIONS";
				break;
			case "POST":
				return "POST";
				break;
			case "PUT":
				return "PUT";
				break;
			case "TRACE":
				return "TRACE";
				break;

			default:
				return "GET";
				break;
		}
	}
	return "GET";
};
