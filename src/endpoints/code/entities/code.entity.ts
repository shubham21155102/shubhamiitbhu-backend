import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { User } from 'src/endpoints/user/entities/user.entity';
// import { Question } from 'src/endpoints/questions/entities/question.entity';

@Entity('code')
export class Code extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  @PrimaryGeneratedColumn('identity', {
    name: 'id2',
  })
  id: string;

  @Column('text', {
    name: 'code',
    nullable: false,
  })
  code: string;
  @Column('varchar', {
    name: 'submittedBy',
    nullable: false,
  })
  submittedBy: string;
  @Column('varchar', {
    name: 'questionId',
    nullable: false,
  })
  questionId: string;

  //   @ManyToOne(() => User, (user) => user.submittedCodes, {
  //     nullable: false,
  //   })
  //   submittedBy: User;

  //   @ManyToOne(() => Question, (question) => question.codes, {
  //     nullable: false,
  //   })
  //   questionId: Question;
}

// @Column('jsonb', {
//   name: 'code',
// })
// code: Record<string, string>;
@Entity('extra_dsa_code')
export class ExtraDsaCode extends Code {}
