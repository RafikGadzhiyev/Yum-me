import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const query = searchParams.get("query");
		const searchBy = searchParams.get("searchBy");
		const email = searchParams.get("email");
		const id = searchParams.get("id");

		const searchQuery: Record<string, unknown> = {};

		if (!email && !id && !query && !searchBy) {
			return NextResponse.json(
				{
					message: "Bad request",
					data: null,
				},
				{
					status: 404,
				},
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

			return NextResponse.json(
				{
					message: "Success",
					data: users,
				},
				{
					status: 200,
				},
			);
		}

		const user = await prisma.user.findUnique({
			where: searchQuery as any, // eslint-disable-line
			include: {
				generatedFoods: true,
				posts: true,
			},
		});

		if (!user) {
			return NextResponse.json(
				{
					message: "User does not exist",
					data: null,
				},
				{
					status: 404,
				},
			);
		}

		return NextResponse.json({
			message: "Success",
			data: user,
		});
	} catch (err) {
		return NextResponse.json(
			{
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

		const user = await prisma.user.create({
			data: {
				email: body.email,
			},
		});

		if (!user) {
			return NextResponse.json(
				{
					message: "Bad request",
				},
				{
					status: 404,
				},
			);
		}

		return NextResponse.json({
			data: user,
			message: "Success",
		});
	} catch (err) {
		return NextResponse.json(
			{
				message: (err as Error).message,
			},
			{
				status: 500,
			},
		);
	}
};

export const PATCH = async (req: NextRequest) => {
	try {
		// list of fields that cannot be updated
		const CONSTANT_FIELDS = ["id"];
		const POPULATED_FIELDS = ["generatedFoods", "posts"];

		const body = await req.json();

		const updateQuery = body.fieldsToUpdate;
		const searchQuery = body.searchQuery;

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

		const user = await prisma.user.update({
			where: searchQuery,
			data: updateQuery,
		});

		return NextResponse.json({
			message: "Success",
			data: user,
		});
	} catch (err) {
		return NextResponse.json(
			{
				message: (err as Error).message,
			},
			{
				status: 500,
			},
		);
	}
};
