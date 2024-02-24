import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { configUpload } from '@config/upload';

@Entity('consult_license_plates')
class ConsultLicensePlate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  camera_id: string;

  @Column()
  image_name: string;

  @Column()
  date_hour: string;

  @Column()
  pagazul_status: boolean;

  @Column()
  pagazul_expired: boolean;

  @Column()
  external_pagazul_id: string;

  @Column()
  message_error: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({
    name: 'url',
  })
  getUrl(): string | null {
    if (!this.image_name) {
      return null;
    }

    return `${configUpload.url}/consults/${this.image_name}`;
  }
}

export { ConsultLicensePlate };
