import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Code } from 'src/endpoints/code/entities/code.entity';
import { Question } from 'src/endpoints/questions/entities/question.entity';

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

  @OneToMany(() => Code, (code) => code.submittedBy)
  submittedCodes: Code[];

  @ManyToMany(() => Question, (question) => question.users)
  questions: Question[];
}
