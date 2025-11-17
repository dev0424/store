import { Migration } from '@mikro-orm/migrations';

export class Migration20251117152009 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "location" alter column "latitude" type real using ("latitude"::real);`);
    this.addSql(`alter table if exists "location" alter column "longitude" type real using ("longitude"::real);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "location" alter column "latitude" type integer using ("latitude"::integer);`);
    this.addSql(`alter table if exists "location" alter column "longitude" type integer using ("longitude"::integer);`);
  }

}
