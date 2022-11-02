/*
  Warnings:

  - The primary key for the `candidacy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `request_id` on the `candidacy` table. All the data in the column will be lost.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `provider` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `provider_service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `order_id` to the `candidacy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "candidacy" DROP CONSTRAINT "candidacy_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "candidacy" DROP CONSTRAINT "candidacy_request_id_fkey";

-- DropForeignKey
ALTER TABLE "provider_service" DROP CONSTRAINT "provider_service_provider_id_fkey";

-- AlterTable
ALTER TABLE "candidacy" DROP CONSTRAINT "candidacy_pkey",
DROP COLUMN "request_id",
ADD COLUMN     "order_id" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "provider_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "candidacy_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "candidacy_id_seq";

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_id_seq";

-- AlterTable
ALTER TABLE "provider" DROP CONSTRAINT "provider_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "provider_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "provider_id_seq";

-- AlterTable
ALTER TABLE "provider_service" DROP CONSTRAINT "provider_service_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "provider_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "provider_service_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "provider_service_id_seq";

-- AddForeignKey
ALTER TABLE "candidacy" ADD CONSTRAINT "candidacy_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "candidacy" ADD CONSTRAINT "candidacy_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_service" ADD CONSTRAINT "provider_service_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
