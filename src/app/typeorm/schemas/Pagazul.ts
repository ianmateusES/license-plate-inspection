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

@Entity('pagazul')
class Pagazul {
  @ObjectIdColumn()
  @Exclude()
  _id: ObjectID;

  @PrimaryColumn()
  id: string;

  @Column()
  status: boolean;

  @Column()
  expired: boolean;

  @Column()
  date: string;

  @Column()
  message: string;

  @Column()
  data: {
    rule: {
      value: number;
      name: string;
    };
    vehicle: {
      category: string;
      brand: string;
      model: string;
    };
    location: {
      city: string;
      state: string;
      address: string;
      lat: string;
      lng: string;
    };
    cad: {
      created_at: string;
      actived_at: string;
      expired_at: string;
    };
  };

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

export { Pagazul };
