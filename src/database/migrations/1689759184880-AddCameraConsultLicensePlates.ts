import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCameraConsultLicensePlates1689759184880
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'consult_license_plates',
      new TableColumn({
        name: 'camera_id',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('consult_license_plates', 'camera_id');
  }
}
