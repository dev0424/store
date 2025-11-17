import { Migration } from '@mikro-orm/migrations';

export class Migration20251117134910 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "location" ("id" text not null, "latitude" integer null, "longitude" integer null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "location_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_location_deleted_at" ON "location" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "location" cascade;`);
  }

}
