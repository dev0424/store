import { Migration } from '@mikro-orm/migrations';

export class Migration20251120203058 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "system_flag" ("id" text not null, "key" text not null, "value" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "system_flag_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_system_flag_deleted_at" ON "system_flag" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "system_flag" cascade;`);
  }

}
