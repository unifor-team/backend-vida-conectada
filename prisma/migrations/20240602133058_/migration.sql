-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "updated_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;
