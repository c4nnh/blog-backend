-- CreateEnum
CREATE TYPE "EmojiFor" AS ENUM ('POST', 'COMMENT');

-- AlterTable
ALTER TABLE "emoji" ADD COLUMN     "for" "EmojiFor"[];

-- CreateTable
CREATE TABLE "react_to_post" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "emojiId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "react_to_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "react_to_comment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "emojiId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "react_to_comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "react_to_post" ADD CONSTRAINT "react_to_post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "react_to_post" ADD CONSTRAINT "react_to_post_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "react_to_post" ADD CONSTRAINT "react_to_post_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "react_to_comment" ADD CONSTRAINT "react_to_comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "react_to_comment" ADD CONSTRAINT "react_to_comment_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "react_to_comment" ADD CONSTRAINT "react_to_comment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
