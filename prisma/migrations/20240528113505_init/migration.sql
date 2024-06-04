-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kindeUserId" TEXT NOT NULL,
    "given_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "h1" TEXT NOT NULL,
    "subh1" TEXT NOT NULL,
    "numberoneh1" TEXT NOT NULL,
    "numberonesub" TEXT NOT NULL,
    "numbertwoh1" TEXT NOT NULL,
    "numbertwosub" TEXT NOT NULL,
    "numberthreeh1" TEXT NOT NULL,
    "numberthreesub" TEXT NOT NULL,
    "q1" TEXT NOT NULL,
    "a1" TEXT NOT NULL,
    "q2" TEXT NOT NULL,
    "a2" TEXT NOT NULL,
    "q3" TEXT NOT NULL,
    "a3" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "OfferRequest" (
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
    "userId" INTEGER NOT NULL,
    "isWaiting" BOOLEAN DEFAULT true,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "OfferRequest_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "Insurance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OfferRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OfficialPolicy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "offerRequestId" INTEGER,
    "officialOfferTitle" TEXT NOT NULL,
    "officialOfferCreatedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "officialOfferUpdatedDate" DATETIME,
    "officialPolicyStartDate" DATETIME,
    "officialPolicyExpireDate" DATETIME,
    "isBought" BOOLEAN DEFAULT false,
    "price" DECIMAL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "OfficialPolicy_offerRequestId_fkey" FOREIGN KEY ("offerRequestId") REFERENCES "OfferRequest" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContractedInstitution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institutionname" TEXT NOT NULL,
    "institutionaddress" TEXT NOT NULL,
    "institutionphonenumber" INTEGER NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "InstitutionType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "contractedinstitutionId" INTEGER,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "InstitutionType_contractedinstitutionId_fkey" FOREIGN KEY ("contractedinstitutionId") REFERENCES "ContractedInstitution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Province" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contractedinstitutionId" INTEGER,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "Province_contractedinstitutionId_fkey" FOREIGN KEY ("contractedinstitutionId") REFERENCES "ContractedInstitution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "contractedinstitutionId" INTEGER,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    CONSTRAINT "District_contractedinstitutionId_fkey" FOREIGN KEY ("contractedinstitutionId") REFERENCES "ContractedInstitution" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Coverage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);

-- CreateTable
CREATE TABLE "_ContractedInstitutionToOfficialPolicy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ContractedInstitutionToOfficialPolicy_A_fkey" FOREIGN KEY ("A") REFERENCES "ContractedInstitution" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ContractedInstitutionToOfficialPolicy_B_fkey" FOREIGN KEY ("B") REFERENCES "OfficialPolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CoverageToOfficialPolicy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CoverageToOfficialPolicy_A_fkey" FOREIGN KEY ("A") REFERENCES "Coverage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CoverageToOfficialPolicy_B_fkey" FOREIGN KEY ("B") REFERENCES "OfficialPolicy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionType_contractedinstitutionId_key" ON "InstitutionType"("contractedinstitutionId");

-- CreateIndex
CREATE UNIQUE INDEX "Province_contractedinstitutionId_key" ON "Province"("contractedinstitutionId");

-- CreateIndex
CREATE UNIQUE INDEX "District_contractedinstitutionId_key" ON "District"("contractedinstitutionId");

-- CreateIndex
CREATE UNIQUE INDEX "_ContractedInstitutionToOfficialPolicy_AB_unique" ON "_ContractedInstitutionToOfficialPolicy"("A", "B");

-- CreateIndex
CREATE INDEX "_ContractedInstitutionToOfficialPolicy_B_index" ON "_ContractedInstitutionToOfficialPolicy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoverageToOfficialPolicy_AB_unique" ON "_CoverageToOfficialPolicy"("A", "B");

-- CreateIndex
CREATE INDEX "_CoverageToOfficialPolicy_B_index" ON "_CoverageToOfficialPolicy"("B");
