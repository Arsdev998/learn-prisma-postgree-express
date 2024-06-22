/*
  Warnings:

  - A unique constraint covering the columns `[userId,wisataId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_wisataId_key" ON "Favorite"("userId", "wisataId");
