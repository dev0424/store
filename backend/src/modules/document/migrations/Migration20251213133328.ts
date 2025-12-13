import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251213133328 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "document" ("id" text not null, "url" text not null, "type" text not null, "name" text null, "mime_type" text null, "size" integer null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "document_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_document_deleted_at" ON "document" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`drop table if exists "product_document" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table if not exists "product_document" ("id" text not null, "url" text not null, "type" text not null, "name" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_document_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_product_document_deleted_at" ON "product_document" (deleted_at) WHERE deleted_at IS NULL;`);

    this.addSql(`drop table if exists "document" cascade;`);
  }

}
