import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Ticket } from './ticket.entity';
import { TicketType } from './ticketType.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  description: string;

  @Column()
  venue: string;

  @Column()
  @IsNotEmpty()
  date: Date;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[];

  @OneToMany(() => TicketType, ticketType => ticketType.event)
  ticketTypes: TicketType[];
}
