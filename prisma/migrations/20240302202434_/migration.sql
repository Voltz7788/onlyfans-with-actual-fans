/*
  Warnings:

  - You are about to drop the column `imageKeys` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "imageKeys",
ADD COLUMN     "images" TEXT[];
