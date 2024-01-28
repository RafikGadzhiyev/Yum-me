import { NextRequest, NextResponse } from "next/server";
import type { Post } from "@prisma/client";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const postId = searchParams.get("id");

		let getType = "all";

		if (postId) {
			getType = "concrete_post";
		}

		let searchResult: null | Post | Post[] = null;

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
				return NextResponse.json(
					{
						message: "Bad request!",
					},
					{
						status: 403,
					},
				);
		}

		return NextResponse.json({
			message: "Success",
			data: searchResult,
		});
	} catch (err) {
		return NextResponse.json(
			{
				code: "Server Error!",
				message: (err as Error).message,
			},
			{
				status: 500,
			},
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();

		const { authorId, content, showLikes } = body;

		if (!authorId) {
			return NextResponse.json(
				{
					message: "Bad request!",
				},
				{
					status: 403,
				},
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

		return NextResponse.json({
			message: "Success!",
			data: newPost,
		});
	} catch (err) {
		return NextResponse.json(
			{
				message: "Server error!",
			},
			{
				status: 500,
			},
		);
	}
};

export const PATCH = async (req: NextRequest) => {
	try {
		const body = await req.json();

		delete body.id;
		delete body.fieldsToUpdate.authorId;
		delete body.fieldsToUpdate.author;

		// TODO: Fix
		// const updateQuery = {
		// 	content: body.fieldsToUpdate.content,
		// 	likes: body.fieldsToUpdate.likes,
		// 	savedBy: body.fieldsToUpdate.savedBy,
		// 	showLikes: body.fieldsToUpdate.showLikes,
		// 	comments: body.fieldsToUpdate.comments,
		// };
		const searchQuery = body.searchQuery;

		const updatedPost = await prisma.post.update({
			where: searchQuery,
			data: body.fieldsToUpdate,
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

		return NextResponse.json({
			message: "Success",
			data: updatedPost,
		});
	} catch (err) {
		return NextResponse.json(
			{
				title: "Server error!",
				message: (err as Error).message,
			},
			{
				status: 500,
			},
		);
	}
};
