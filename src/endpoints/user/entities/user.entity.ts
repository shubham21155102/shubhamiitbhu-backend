import { Question } from 'src/endpoints/questions/entities/question.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;
  @Column('varchar', {
    name: 'email',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;
  @Column('varchar', {
    name: 'username',
    nullable: false,
    unique: true,
  })
  username: string;
  @Column('varchar', {
    name: 'password',
    length: 255,
    nullable: false,
  })
  password: string;
  @ManyToMany(() => Question, (question) => question.users)
  questions: Question[];
}
// import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class JSPLData extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;
  @Column('varchar', {
    name: 'vehicle_type',
    length: 255,
    nullable: false,
  })
  vehicleType: string;
  @Column('varchar', {
    name: 'vehicle_id',
    length: 255,
    nullable: false,
  })
  vehicleId: string;
  @Column('varchar', {
    name: 'start_time',
    length: 255,
    nullable: false,
  })
  startTime: string;
  @Column('varchar', {
    name: 'end_time',
    length: 255,
    nullable: false,
  })
  endTime: string;
}
