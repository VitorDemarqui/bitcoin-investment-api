-- CreateTable
CREATE TABLE "investments" (
    "id" TEXT NOT NULL,
    "invested_amount" DECIMAL(15,2) NOT NULL,
    "btc_quantity" DECIMAL(20,8) NOT NULL,
    "purchase_rate" DECIMAL(20,8) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" TEXT NOT NULL,

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
