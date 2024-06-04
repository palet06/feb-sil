/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OfferRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tc" TEXT,
    "birthdate" DATETIME,
    "weight" INTEGER,
    "height" INTEGER,
    "pregnancy" BOOLEAN,
    "platenumber" TEXT,
    "registrationumber" TEXT,
    "address" TEXT,
    "whereto" INTEGER,
    "trippolicydates" INTEGER,
    "tripstartdate" DATETIME,
    "tripenddate" DATETIME,
    "homestatus" INTEGER,
    "surfacearea" INTEGER,
    "apartmentage" INTEGER,
    "vacancyperiod" INTEGER,
    "risklocated" INTEGER,
    "insuranceId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "isWaiting" BOOLEAN DEFAULT true,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "OfferRequest_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "Insurance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OfferRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("kindeUserId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OfferRequest" ("address", "apartmentage", "birthdate", "createdAt", "height", "homestatus", "id", "insuranceId", "isWaiting", "platenumber", "pregnancy", "registrationumber", "risklocated", "surfacearea", "tc", "tripenddate", "trippolicydates", "tripstartdate", "updatedAt", "userId", "vacancyperiod", "weight", "whereto") SELECT "address", "apartmentage", "birthdate", "createdAt", "height", "homestatus", "id", "insuranceId", "isWaiting", "platenumber", "pregnancy", "registrationumber", "risklocated", "surfacearea", "tc", "tripenddate", "trippolicydates", "tripstartdate", "updatedAt", "userId", "vacancyperiod", "weight", "whereto" FROM "OfferRequest";
DROP TABLE "OfferRequest";
ALTER TABLE "new_OfferRequest" RENAME TO "OfferRequest";
CREATE TABLE "new_User" (
    "kindeUserId" TEXT NOT NULL PRIMARY KEY,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_User" ("createdAt", "email", "family_name", "given_name", "kindeUserId", "picture", "updatedAt") SELECT "createdAt", "email", "family_name", "given_name", "kindeUserId", "picture", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check("OfferRequest");
PRAGMA foreign_key_check("User");
PRAGMA foreign_keys=ON;
