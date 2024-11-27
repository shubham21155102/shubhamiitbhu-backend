import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;
  @Column({
    name: 'customer_id',
  })
  customer_id: string;
  @Column({
    name: 'customer_email',
  })
  customer_email: string;
  @Column({
    name: 'customer_phone',
  })
  customer_phone: string;
  @Column({
    name: 'customer_name',
  })
  customer_name: string;
  @Column({
    name: 'order_amount',
  })
  order_amount: string;
  @Column({
    name: 'order_currency',
  })
  order_currency: string;
  @Column({
    name: 'order_note',
  })
  order_note: string;
  @Column({
    name: 'order_meta',
    nullable: true,
  })
  order_meta: string;
  @Column({
    name: 'order_id',
    nullable: true,
  })
  order_id: string;
  @Column({
    name: 'payment_status',
    nullable: true,
  })
  payment_status: string;
  @Column({
    name: 'payment_mode',
    nullable: true,
  })
  payment_mode: string;
  @Column({
    name: 'payment_id',
    nullable: true,
  })
  payment_id: string;
  @Column({
    name: 'payment_date',
    nullable: true,
  })
  payment_date: string;
}
