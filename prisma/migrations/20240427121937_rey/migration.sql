/*
  Warnings:

  - You are about to drop the column `quoteId` on the `Author` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_quoteId_fkey";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "quoteId";

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE SET NULL ON UPDATE CASCADE;
