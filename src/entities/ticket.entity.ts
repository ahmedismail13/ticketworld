import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Event } from './events.entity';
import { TicketType } from './ticketType.entity';
import { Reservation } from './reservations.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  date: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  type: number;

  @ManyToOne(() => Event, event => event.tickets)
  event: Event;

  @ManyToOne(() => TicketType, ticketType => ticketType.tickets)
  ticketType: TicketType;

  @ManyToOne(() => Reservation, reservation => reservation.tickets)
  reservation: Reservation;
}