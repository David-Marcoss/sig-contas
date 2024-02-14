/*
  Warnings:

  - You are about to drop the column `salario` on the `contas` table. All the data in the column will be lost.
  - Added the required column `valor` to the `contas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "userId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "contas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_contas" ("categoria", "created_at", "id", "nome", "updated_at", "userId") SELECT "categoria", "created_at", "id", "nome", "updated_at", "userId" FROM "contas";
DROP TABLE "contas";
ALTER TABLE "new_contas" RENAME TO "contas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
