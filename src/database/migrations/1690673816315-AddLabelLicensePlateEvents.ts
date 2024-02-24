import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddLabelLicensePlateEvents1690673816315
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'license_plate_events',
      new TableColumn({
        name: 'label',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('license_plate_events', 'label');
  }
}
