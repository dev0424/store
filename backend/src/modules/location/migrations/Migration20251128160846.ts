import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20251128160846 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "location" add column if not exists "address_1" text null, add column if not exists "address_2" text null, add column if not exists "city" text null, add column if not exists "country_code" text null, add column if not exists "province" text null, add column if not exists "postal_code" text null, add column if not exists "phone" text null, add column if not exists "email" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "location" drop column if exists "address_1", drop column if exists "address_2", drop column if exists "city", drop column if exists "country_code", drop column if exists "province", drop column if exists "postal_code", drop column if exists "phone", drop column if exists "email";`);
  }

}
