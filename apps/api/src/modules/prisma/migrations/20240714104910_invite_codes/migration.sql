-- CreateTable
CREATE TABLE "org_invite_code" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "org_invite_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_invite_code" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "project_invite_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "org_invite_code_code_key" ON "org_invite_code"("code");

-- CreateIndex
CREATE UNIQUE INDEX "org_invite_code_email_org_id_key" ON "org_invite_code"("email", "org_id");

-- CreateIndex
CREATE UNIQUE INDEX "project_invite_code_code_key" ON "project_invite_code"("code");

-- CreateIndex
CREATE UNIQUE INDEX "project_invite_code_email_project_id_key" ON "project_invite_code"("email", "project_id");

-- AddForeignKey
ALTER TABLE "org_invite_code" ADD CONSTRAINT "org_invite_code_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "organisation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_invite_code" ADD CONSTRAINT "project_invite_code_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
