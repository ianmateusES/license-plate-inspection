import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCameraLicensePlateEvents1689759165530
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'license_plate_events',
      new TableColumn({
        name: 'camera_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('license_plate_events', 'camera_id');
  }
}
