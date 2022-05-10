import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Ticket } from './ticket.entity';
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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNotEmpty()
  ticketPrice: number;

  @Column()
  imagePath: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[];
}
