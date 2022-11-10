/*
  Warnings:

  - You are about to drop the column `service_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `provider_service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `service` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `provider` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Service" AS ENUM ('TECHNICAL_ASSISTANCE', 'RENOVATIONS_REPAIRS', 'LESSON', 'AUTOMOBILES');

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_service_id_fkey";

-- DropForeignKey
ALTER TABLE "provider_service" DROP CONSTRAINT "provider_service_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "provider_service" DROP CONSTRAINT "provider_service_service_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "service_id",
ADD COLUMN     "service" "Service" NOT NULL;

-- AlterTable
ALTER TABLE "provider" ADD COLUMN     "service" "Service" NOT NULL;

-- DropTable
DROP TABLE "provider_service";

-- DropTable
DROP TABLE "service";
