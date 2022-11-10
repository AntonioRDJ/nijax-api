/*
  Warnings:

  - You are about to drop the column `location` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `provider` table. All the data in the column will be lost.
  - Added the required column `lat` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "location",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "provider" DROP COLUMN "location",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;
