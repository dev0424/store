import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260102114830 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "contact_person" ("id" text not null, "title" text not null, "first_name" text not null, "last_name" text not null, "role" text not null, "phone" text not null, "email" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "contact_person_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_contact_person_deleted_at" ON "contact_person" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "contact_person" cascade;`);
  }

}
