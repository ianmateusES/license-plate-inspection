import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { configUpload } from '@config/upload';

@Entity('license_plate_events')
class LicensePlateEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  plate: string;

  @Column()
  label: string;

  @Column()
  image_name: string;

  @Column()
  bound_box: string;

  @Column()
  date_hour: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  camera_id: string;

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

    return `${configUpload.url}/imgs/${this.image_name}`;
  }
}

export { LicensePlateEvent };
