import { Migration } from '@mikro-orm/migrations';

export class Migration20251101134601 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "billing_address" ("id" text not null, "address_1" text not null, "address_2" text null, "postal_code" text not null, "city" text not null, "country_code" text not null, "province" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "billing_address_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_billing_address_deleted_at" ON "billing_address" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "billing_address" cascade;`);
  }

}
