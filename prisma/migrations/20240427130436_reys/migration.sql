/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Author` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Author_name_key";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "email" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");
