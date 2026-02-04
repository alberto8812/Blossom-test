-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "origin_id" TEXT NOT NULL,
    "species_id" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "genders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "origins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "origins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "characters_name_idx" ON "characters"("name");

-- CreateIndex
CREATE INDEX "characters_status_idx" ON "characters"("status");

-- CreateIndex
CREATE INDEX "characters_origin_id_idx" ON "characters"("origin_id");

-- CreateIndex
CREATE INDEX "characters_species_id_idx" ON "characters"("species_id");

-- CreateIndex
CREATE INDEX "characters_deleted_at_idx" ON "characters"("deleted_at");

-- CreateIndex
CREATE INDEX "genders_name_idx" ON "genders"("name");

-- CreateIndex
CREATE INDEX "genders_deleted_at_idx" ON "genders"("deleted_at");

-- CreateIndex
CREATE INDEX "origins_name_idx" ON "origins"("name");

-- CreateIndex
CREATE INDEX "origins_deleted_at_idx" ON "origins"("deleted_at");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "origins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_species_id_fkey" FOREIGN KEY ("species_id") REFERENCES "genders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
