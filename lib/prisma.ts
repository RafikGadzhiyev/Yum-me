// import { PrismaClient } from "@prisma/client";
//
// declare global {
// 	// eslint-disable-next-line no-var
// 	var prisma: PrismaClient | undefined;
// }
//
// const prisma = global.prisma || new PrismaClient({ log: ["info"] });
// if (process.env.NODE_ENV !== "production") global.prisma = prisma;
//
// export default prisma;

import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;
