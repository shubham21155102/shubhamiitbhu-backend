import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/endpoints/user/entities/user.entity';
import { Question } from 'src/endpoints/questions/entities/question.entity';

@Entity('code')
export class Code extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column('text', {
    name: 'code',
    nullable: false,
  })
  code: string;

  @ManyToOne(() => User, (user) => user.submittedCodes, {
    nullable: false,
  })
  submittedBy: User;

  @ManyToOne(() => Question, (question) => question.codes, {
    nullable: false,
  })
  questionId: Question;
}

// @Column('jsonb', {
//   name: 'code',
// })
// code: Record<string, string>;
