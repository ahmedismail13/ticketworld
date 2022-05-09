import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Ticket } from './ticket.entity';
import { User } from './users.entity';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  type: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  paymentInProgress: boolean;

  @Column({ nullable: true })
  payed: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.reservations)
  user: User;

  @OneToMany(() => Ticket, ticket => ticket.reservation)
  tickets: Ticket[];
}
