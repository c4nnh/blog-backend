/*
  Warnings:

  - A unique constraint covering the columns `[userId,commentId]` on the table `react_to_comment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,postId]` on the table `react_to_post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "react_to_comment_userId_commentId_key" ON "react_to_comment"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "react_to_post_userId_postId_key" ON "react_to_post"("userId", "postId");
