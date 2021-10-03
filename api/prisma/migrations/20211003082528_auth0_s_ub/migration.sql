/*
  Warnings:

  - A unique constraint covering the columns `[auth0Sub]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth0Sub` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth0Sub" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User.auth0Sub_unique" ON "User"("auth0Sub");
