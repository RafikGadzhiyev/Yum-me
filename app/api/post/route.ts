import { NextRequest } from "next/server";

import prisma from "@/lib/prisma";
import { handleRequest } from "@/utils/handlers.util";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const postId = searchParams.get("id");

		let getType = "all";

		if (postId) {
			getType = "concrete_post";
		}

		let searchResult = null;

		const includeQuery = {
			author: {
				select: {
					name: true,
					lastName: true,
					role: true,
				},
			},
		};

		switch (getType) {
			case "all":
				searchResult = await prisma.post.findMany({
					include: includeQuery,
				});

				break;
			case "concrete_post":
				searchResult = await prisma.post.findUnique({
					where: {
						id: postId as string,
					},
					include: includeQuery,
				});

				break;
			default:
				return handleRequest(
					null,
					{
						title: "Bad request",
						message: "Invalid getType",
					},
					400,
				);
		}

		return handleRequest(searchResult, null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(
			null,
			{
				title: "Server Error!",
				message: "Something went wrong",
			},
			500,
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();

		const { authorId, content, showLikes } = body;

		if (!authorId) {
			return handleRequest(
				null,
				{
					title: "Bad request",
					message: "Invalid authorId",
				},
				400,
			);
		}

		const newPost = await prisma.post.create({
			data: {
				author: {
					connect: {
						id: authorId,
					},
				},
				content,
				showLikes,
			},
		});

		return handleRequest(newPost, null, 200);
	} catch (err) {
		console.log(err);

		return handleRequest(
			null,
			{
				title: "Server error!",
				message: "Something went wrong",
			},
			500,
		);
	}
};

export const PATCH = async (req: NextRequest) => {
	try {
		const CONSTANT_FIELDS = ["id"];
		const POPULATED_FIELDS = ["author"];

		const body = await req.json();

		delete body.id;
		delete body.fieldsToUpdate.authorId;
		delete body.fieldsToUpdate.author;

		const searchQuery = body.searchQuery;
		const updateQuery = body.fieldsToUpdate;

		// ensuring that updateQuery does not contain fields from constant fields
		for (const constantField of CONSTANT_FIELDS) {
			delete updateQuery[constantField];
		}

		// for populated fields changing update query
		for (const populatedField of POPULATED_FIELDS) {
			updateQuery[populatedField] = {
				connect: updateQuery[populatedField],
			};
		}

		const updatedPost = await prisma.post.update({
			where: searchQuery,
			data: updateQuery,
			include: {
				author: {
					select: {
						name: true,
						lastName: true,
						role: true,
					},
				},
			},
		});

		return handleRequest(updatedPost, null, 200);
	} catch (err) {
		console.error(err);

		return handleRequest(
			null,
			{
				title: "Server error!",
				message: "Something went wrong",
			},
			500,
		);
	}
};
