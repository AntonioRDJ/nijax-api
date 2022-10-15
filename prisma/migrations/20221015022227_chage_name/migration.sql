/*
  Warnings:

  - You are about to drop the `request` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "candidacy" DROP CONSTRAINT "candidacy_request_id_fkey";

-- DropForeignKey
ALTER TABLE "request" DROP CONSTRAINT "request_service_id_fkey";

-- DropForeignKey
ALTER TABLE "request" DROP CONSTRAINT "request_user_id_fkey";

-- DropTable
DROP TABLE "request";

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "service_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OPENED',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidacy" ADD CONSTRAINT "candidacy_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
