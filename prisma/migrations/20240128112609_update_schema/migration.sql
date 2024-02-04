/*
  Warnings:

  - You are about to drop the column `postId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likes" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postId";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
