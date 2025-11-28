import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251128115912 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "billing_cycle" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "billing_cycle_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_billing_cycle_deleted_at" ON "billing_cycle" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "billing_cycle" cascade;`);
  }

}
