import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260102105002 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "customer_profile" add column if not exists "revenue_previous_year" numeric null, add column if not exists "employee_count" integer null, add column if not exists "raw_revenue_previous_year" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "customer_profile" drop column if exists "revenue_previous_year", drop column if exists "employee_count", drop column if exists "raw_revenue_previous_year";`);
  }

}
