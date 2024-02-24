import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
  PrimaryColumn,
} from 'typeorm';

@Entity('ultimateAlpr')
class UltimateAlpr {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  detections: {
    car: {
      confidence: number;
      warpedBox: number[];
    };
    confidences: number[];
    text: string;
    warpedBox: number[];
  }[];

  @Column('uuid')
  external_license_plate_event_id: string;

  @Column('uuid')
  external_consult_license_plate_id: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export { UltimateAlpr };
