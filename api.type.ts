import { NextApiRequest } from "next";

export interface ExtendedRequest extends NextApiRequest {
	theme: "light" | "dark";
}