import { Migration } from '@mikro-orm/migrations';

export class Migration20251114134747 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "account_status" ("id" text not null, "application_status" text check ("application_status" in ('PENDING', 'APPROVED', 'DECLINED')) not null, "is_searchable" boolean not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "account_status_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_account_status_deleted_at" ON "account_status" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "account_status" cascade;`);
  }

}
