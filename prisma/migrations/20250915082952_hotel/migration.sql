/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "refreshToken",
ADD COLUMN     "refresh_token" TEXT;
