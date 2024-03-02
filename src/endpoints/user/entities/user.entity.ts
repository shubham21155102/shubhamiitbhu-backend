import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
