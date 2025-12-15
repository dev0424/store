import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251215114510 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "account_group" ("id" text not null, "is_centralized_billing" boolean not null, "corporate_status" text check ("corporate_status" in ('subsidiary', 'independent')) not null, "is_purchasing_group_member" boolean not null, "purchasing_group_name" text null, "membership_number" text null, "is_agency_or_branch" boolean not null, "parent_group_name" text null, "is_platform_client" boolean not null, "platform_name" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "account_group_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_account_group_deleted_at" ON "account_group" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "account_group" cascade;`);
  }

}
