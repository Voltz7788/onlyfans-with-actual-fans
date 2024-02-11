/*
  Warnings:

  - Made the column `timePosted` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "timePosted" SET NOT NULL,
ALTER COLUMN "timePosted" SET DEFAULT CURRENT_TIMESTAMP;
