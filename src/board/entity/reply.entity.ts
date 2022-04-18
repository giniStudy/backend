import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BoardEntity } from './board.entity';

@Entity()
export class ReplyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  writer: string;

  @CreateDateColumn({ name: 'create_date', comment: '생성일' })
  createdDate: Date;

  @ManyToOne(() => BoardEntity, (board) => board.replys)
  board: BoardEntity;
}
