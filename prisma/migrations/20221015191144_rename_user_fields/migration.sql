/*
  Warnings:

  - Added the required column `birth_date` to the `user` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `cpf_cnpj` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
DROP COLUMN "cpf_cnpj",
ADD COLUMN     "cpf_cnpj" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_cnpj_key" ON "user"("cpf_cnpj");
