import "server-only";
import OpenAI from "openai";

export const openAI = new OpenAI({
	apiKey: process.env.OPENAI_SECRET_KEY,
});
