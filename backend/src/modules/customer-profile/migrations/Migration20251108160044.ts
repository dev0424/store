import { Migration } from '@mikro-orm/migrations';

export class Migration20251108160044 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "customer_profile" ("id" text not null, "vat_number" text not null, "siret_number" text not null, "ape_code" text not null, "activity" text not null, "billing_cycle" text not null, "payment_method" text not null, "invoice_email" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "customer_profile_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_customer_profile_deleted_at" ON "customer_profile" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "customer_profile" cascade;`);
  }

}
