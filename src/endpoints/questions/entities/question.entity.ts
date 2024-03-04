import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Code } from 'src/endpoints/code/entities/code.entity';
import { User } from 'src/endpoints/user/entities/user.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column('varchar', {
    name: 'questionid',
  })
  questionid: string;

  @Column('varchar', {
    name: 'title',
  })
  title: string;

  @Column('varchar', {
    name: 'subtitle',
  })
  subtitle: string;

  @Column('varchar', {
    name: 'subsubtitle',
  })
  subsubtitle: string;

  @OneToMany(() => Code, (code) => code.questionId)
  codes: Code[];

  @ManyToMany(() => User, (user) => user.questions)
  users: User[];
}
