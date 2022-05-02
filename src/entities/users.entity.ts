import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
