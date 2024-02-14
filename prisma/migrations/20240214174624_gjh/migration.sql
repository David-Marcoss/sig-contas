/*
  Warnings:

  - You are about to alter the column `objetivo` on the `poupanca` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_poupanca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "saldo" REAL NOT NULL,
    "objetivo" REAL NOT NULL,
    "userId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "poupanca_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_poupanca" ("created_at", "descricao", "id", "nome", "objetivo", "saldo", "updated_at", "userId") SELECT "created_at", "descricao", "id", "nome", "objetivo", "saldo", "updated_at", "userId" FROM "poupanca";
DROP TABLE "poupanca";
ALTER TABLE "new_poupanca" RENAME TO "poupanca";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
