import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gate')
export class Gate {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;
  @Column('varchar', {
    name: 'department',
    nullable: false,
  })
  department: string;
  @Column('varchar', {
    name: 'year',
    nullable: false,
  })
  year: string;
  @Column('varchar', {
    name: 'question',
    nullable: false,
  })
  question: string;
  @Column('varchar', {
    name: 'image',
    nullable: true,
  })
  image: string;
  @Column('jsonb', {
    name: 'options',
    nullable: false,
  })
  options: Record<string, string>;
  @Column('varchar', {
    name: 'answer',
    nullable: false,
  })
  answer: string;
}
