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
  seat_number: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Event, event => event.tickets)
  event: Event;

  @Column({ nullable: false })
  eventId: number;

  @ManyToOne(() => TicketType, ticketType => ticketType.tickets)
  ticketType: TicketType;

  @Column()
  @IsNotEmpty()
  ticketTypeId: number;

  @ManyToOne(() => Reservation, reservation => reservation.tickets)
  reservation: Reservation;

  @Column({ nullable: true })
  reservationId: number;
}
