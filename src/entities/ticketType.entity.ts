import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Event } from './events.entity';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  price: number;

  @ManyToOne(() => Event, event => event.ticketTypes)
  event: Event;

  @OneToMany(() => Ticket, ticket => ticket.ticketType)
  tickets: Ticket[];
}
