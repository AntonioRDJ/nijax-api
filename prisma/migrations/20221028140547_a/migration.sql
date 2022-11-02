/*
  Warnings:

  - You are about to drop the column `service_id` on the `order` table. All the data in the column will be lost.
  - Added the required column `service` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_service_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "service_id",
ADD COLUMN     "service" TEXT NOT NULL;
