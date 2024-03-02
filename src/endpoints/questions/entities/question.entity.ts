import { User } from 'src/endpoints/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Question {
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
  @ManyToMany(() => User, (user) => user.questions)
  @JoinTable()
  users: User[];
}
