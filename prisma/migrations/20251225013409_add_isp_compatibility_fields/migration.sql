-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "hasMeshWifi" TEXT,
ADD COLUMN     "recommendedTier" TEXT,
ADD COLUMN     "technicalComfort" TEXT,
ADD COLUMN     "uploadSpeed" TEXT;

-- CreateTable
CREATE TABLE "IspCompatibility" (
    "id" TEXT NOT NULL,
    "ispName" TEXT NOT NULL,
    "ispSlug" TEXT NOT NULL,
    "connectionType" TEXT NOT NULL,
    "hasCgnat" BOOLEAN NOT NULL DEFAULT false,
    "portForwardMethod" TEXT,
    "difficultyScore" INTEGER NOT NULL DEFAULT 1,
    "recommendedTier" TEXT,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IspCompatibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompatibilityCheck" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "ispSelected" TEXT NOT NULL,
    "hasMeshWifi" TEXT,
    "uploadSpeed" TEXT,
    "technicalLevel" TEXT,
    "recommendedTier" TEXT NOT NULL,
    "canDiy" BOOLEAN,
    "convertedToLead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompatibilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IspCompatibility_ispName_key" ON "IspCompatibility"("ispName");

-- CreateIndex
CREATE UNIQUE INDEX "IspCompatibility_ispSlug_key" ON "IspCompatibility"("ispSlug");

-- CreateIndex
CREATE INDEX "IspCompatibility_ispSlug_idx" ON "IspCompatibility"("ispSlug");

-- CreateIndex
CREATE INDEX "IspCompatibility_hasCgnat_idx" ON "IspCompatibility"("hasCgnat");

-- CreateIndex
CREATE INDEX "IspCompatibility_difficultyScore_idx" ON "IspCompatibility"("difficultyScore");

-- CreateIndex
CREATE INDEX "CompatibilityCheck_email_idx" ON "CompatibilityCheck"("email");

-- CreateIndex
CREATE INDEX "CompatibilityCheck_ispSelected_idx" ON "CompatibilityCheck"("ispSelected");

-- CreateIndex
CREATE INDEX "CompatibilityCheck_recommendedTier_idx" ON "CompatibilityCheck"("recommendedTier");

-- CreateIndex
CREATE INDEX "CompatibilityCheck_createdAt_idx" ON "CompatibilityCheck"("createdAt");

-- CreateIndex
CREATE INDEX "Consultation_homeIsp_idx" ON "Consultation"("homeIsp");
