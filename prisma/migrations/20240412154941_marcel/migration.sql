-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote" (
    "id" SERIAL NOT NULL,
    "quote" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
