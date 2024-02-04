import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { handleRequest } from "@/utils/handlers.util";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const query = searchParams.get("query");
		const searchBy = searchParams.get("searchBy");
		const email = searchParams.get("email");
		const id = searchParams.get("id");

		const searchQuery: Record<string, unknown> = {};

		if (!email && !id && !query && !searchBy) {
			return handleRequest(
				null,
				{
					title: "Bad request",
					message: "search parameters did not provide",
				},
				400,
			);
		}

		if (email) {
			searchQuery.email = email;
		}

		if (id) {
			searchQuery.id = id;
		}

		if (query) {
			searchQuery[searchBy as string] = {
				startsWith: query,
			};

			const users = await prisma.user.findMany({
				where: searchQuery,
				include: {
					generatedFoods: true,
					posts: true,
				},
			});

			return handleRequest(users, null, 200);
		}

		const user = await prisma.user.findUnique({
			where: searchQuery as any, // eslint-disable-line
			include: {
				generatedFoods: true,
				posts: true,
			},
		});

		if (!user) {
			return handleRequest(
				null,
				{
					title: "Not found",
					message: "User does not exist",
				},
				404,
			);
		}

		return handleRequest(user, null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(
			null,
			{
				title: "Server Error",
				message: "Something went wrong",
			},
			500,
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();

		const user = await prisma.user.create({
			data: {
				email: body.email,
			},
		});

		if (!user) {
			return handleRequest(
				null,
				{
					title: "Bad request",
					message: "Cannot create new user",
				},
				400,
			);
		}

		return handleRequest(user, null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(
			null,
			{
				title: "Server Error",
				message: "Something went wrong",
			},
			500,
		);
	}
};

export const PATCH = async (req: NextRequest) => {
	try {
		// list of fields that cannot be updated
		const CONSTANT_FIELDS = ["id", "posts"];
		const POPULATED_FIELDS = ["generatedFoods", "posts"];
		const JSON_FIELDS = ["comments"];

		const body = await req.json();

		const updateQuery = body.fieldsToUpdate;
		const searchQuery = body.searchQuery;

		// ensuring that updateQuery does not contain fields from constant fields
		for (const constantField of CONSTANT_FIELDS) {
			delete updateQuery[constantField];
		}

		// for populated fields changing update query
		for (const populatedField of POPULATED_FIELDS) {
			let updatedValue = updateQuery[populatedField];

			if (JSON_FIELDS.includes(populatedField)) {
				updatedValue = updatedValue as Prisma.JsonArray;
			}

			updateQuery[populatedField] = {
				connect: updateQuery[populatedField],
			};
		}

		const user = await prisma.user.update({
			where: searchQuery,
			data: updateQuery,
		});

		return handleRequest(user, null, 200);
	} catch (err) {
		console.log(err);

		return handleRequest(
			null,
			{
				title: "Server Error",
				message: "Something went wrong",
			},
			500,
		);
	}
};
