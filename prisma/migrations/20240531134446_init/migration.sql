/*
  Warnings:

  - You are about to drop the column `contractedinstitutionId` on the `Province` table. All the data in the column will be lost.
  - You are about to drop the column `contractedinstitutionId` on the `District` table. All the data in the column will be lost.
  - You are about to drop the column `contractedinstitutionId` on the `InstitutionType` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ContractedInstitutionToInstitutionType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ContractedInstitutionToInstitutionType_A_fkey" FOREIGN KEY ("A") REFERENCES "ContractedInstitution" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContractedInstitutionToInstitutionType_B_fkey" FOREIGN KEY ("B") REFERENCES "InstitutionType" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ContractedInstitutionToProvince" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ContractedInstitutionToProvince_A_fkey" FOREIGN KEY ("A") REFERENCES "ContractedInstitution" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContractedInstitutionToProvince_B_fkey" FOREIGN KEY ("B") REFERENCES "Province" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ContractedInstitutionToDistrict" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ContractedInstitutionToDistrict_A_fkey" FOREIGN KEY ("A") REFERENCES "ContractedInstitution" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContractedInstitutionToDistrict_B_fkey" FOREIGN KEY ("B") REFERENCES "District" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Province" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Province" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Province";
DROP TABLE "Province";
ALTER TABLE "new_Province" RENAME TO "Province";
CREATE TABLE "new_District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "provinceId" INTEGER,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_District" ("createdAt", "id", "name", "provinceId", "updatedAt") SELECT "createdAt", "id", "name", "provinceId", "updatedAt" FROM "District";
DROP TABLE "District";
ALTER TABLE "new_District" RENAME TO "District";
CREATE TABLE "new_InstitutionType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_InstitutionType" ("createdAt", "id", "type", "updatedAt") SELECT "createdAt", "id", "type", "updatedAt" FROM "InstitutionType";
DROP TABLE "InstitutionType";
ALTER TABLE "new_InstitutionType" RENAME TO "InstitutionType";
PRAGMA foreign_key_check("Province");
PRAGMA foreign_key_check("District");
PRAGMA foreign_key_check("InstitutionType");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ContractedInstitutionToInstitutionType_AB_unique" ON "_ContractedInstitutionToInstitutionType"("A", "B");

-- CreateIndex
CREATE INDEX "_ContractedInstitutionToInstitutionType_B_index" ON "_ContractedInstitutionToInstitutionType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContractedInstitutionToProvince_AB_unique" ON "_ContractedInstitutionToProvince"("A", "B");

-- CreateIndex
CREATE INDEX "_ContractedInstitutionToProvince_B_index" ON "_ContractedInstitutionToProvince"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContractedInstitutionToDistrict_AB_unique" ON "_ContractedInstitutionToDistrict"("A", "B");

-- CreateIndex
CREATE INDEX "_ContractedInstitutionToDistrict_B_index" ON "_ContractedInstitutionToDistrict"("B");
