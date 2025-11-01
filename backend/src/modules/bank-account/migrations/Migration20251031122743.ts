import { Migration } from '@mikro-orm/migrations';

export class Migration20251031122743 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "bank_account" ("id" text not null, "bank_name" text not null, "bank_code" text not null, "branch_code" text not null, "city" text not null, "address" text not null, "account_number" text not null, "account_holder" text not null, "iban" text not null, "bic" text not null, "rib_key" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "bank_account_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_bank_account_deleted_at" ON "bank_account" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "bank_account" cascade;`);
  }

}
