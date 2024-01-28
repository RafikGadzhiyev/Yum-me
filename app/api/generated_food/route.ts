import { NextRequest, NextResponse } from "next/server";
import type { GeneratedFood } from "@prisma/client";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const generatedFoodId = searchParams.get("generatedFoodId");

		let getType = "all";

		if (generatedFoodId) {
			getType = "concrete_post";
		}

		let searchResult: null | GeneratedFood | GeneratedFood[] = null;

		const includeQuery = {
			generatedBy: {
				select: {
					name: true,
					lastName: true,
					role: true,
				},
			},
		};

		switch (getType) {
			case "all":
				searchResult = await prisma.generatedFood.findMany({
					include: includeQuery,
				});

				break;
			case "concrete_post":
				searchResult = await prisma.generatedFood.findUnique({
					where: {
						id: generatedFoodId as string,
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
				message: "Server Error",
			},
			{
				status: 500,
			},
		);
	}
};

export const POST = async (req: NextRequest) => {
	try {
		const { generatedById, description } = await req.json();

		if (!generatedById) {
			return NextResponse.json({
				message: "Bad request",
				data: null,
			});
		}

		const newGeneratedFood = await prisma.generatedFood.create({
			data: {
				description,
				generatedBy: {
					connect: {
						id: generatedById,
					},
				},
			},
		});

		return NextResponse.json({
			message: "Success",
			data: newGeneratedFood,
		});
	} catch (err) {
		return NextResponse.json(
			{
				message: "Server Error",
			},
			{
				status: 500,
			},
		);
	}
};
