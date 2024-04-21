/*
  Warnings:

  - You are about to drop the column `authorId` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `quote` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `text` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_authorId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "quote",
DROP COLUMN "updatedAt",
ADD COLUMN     "text" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "quoteId" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
