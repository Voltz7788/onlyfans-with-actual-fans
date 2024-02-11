-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "timePosted" TIMESTAMP(3),
    "text" TEXT NOT NULL,
    "image" TEXT,
    "video" TEXT,
    "numOfLikes" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);


-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
