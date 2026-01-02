import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260102112317 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "customer_profile" drop column if exists "raw_revenue_previous_year";`);

    this.addSql(`alter table if exists "customer_profile" alter column "revenue_previous_year" type real using ("revenue_previous_year"::real);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "customer_profile" add column if not exists "raw_revenue_previous_year" jsonb null;`);
    this.addSql(`alter table if exists "customer_profile" alter column "revenue_previous_year" type numeric using ("revenue_previous_year"::numeric);`);
  }

}
