-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contractedinstitutionId" INTEGER,
    "provinceId" INTEGER,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "District_contractedinstitutionId_fkey" FOREIGN KEY ("contractedinstitutionId") REFERENCES "ContractedInstitution" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_District" ("contractedinstitutionId", "createdAt", "id", "name", "updatedAt") SELECT "contractedinstitutionId", "createdAt", "id", "name", "updatedAt" FROM "District";
DROP TABLE "District";
ALTER TABLE "new_District" RENAME TO "District";
CREATE UNIQUE INDEX "District_contractedinstitutionId_key" ON "District"("contractedinstitutionId");
PRAGMA foreign_key_check("District");
PRAGMA foreign_keys=ON;
