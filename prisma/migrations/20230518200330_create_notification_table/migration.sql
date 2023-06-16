-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipientId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME,
    "cancelledAt" DATETIME
);

-- CreateIndex
CREATE INDEX "notification_recipientId_idx" ON "notification"("recipientId");
