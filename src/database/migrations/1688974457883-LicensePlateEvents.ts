import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class LicensePlateEvents1688974457883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'license_plate_events',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'plate',
            type: 'varchar',
          },
          {
            name: 'image_name',
            type: 'varchar',
          },
          {
            name: 'bound_box',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date_hour',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'latitude',
            type: 'decimal(11,7)',
            isNullable: true,
          },
          {
            name: 'longitude',
            type: 'decimal(11,7)',
            isNullable: true,
          },
          {
            name: 'pagazul_status',
            type: 'bool',
            isNullable: true,
          },
          {
            name: 'pagazul_expired',
            type: 'bool',
            isNullable: true,
          },
          {
            name: 'external_pagazul_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'message_error',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('license_plate_events');
  }
}
