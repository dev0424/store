import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251128114053 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "custom_payment_method" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "custom_payment_method_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_custom_payment_method_deleted_at" ON "custom_payment_method" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "custom_payment_method" cascade;`);
  }

}
