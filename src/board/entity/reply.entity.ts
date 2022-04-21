import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BoardEntity } from './board.entity';
import { BoardDto } from '../dto/board.dto';

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

  static from(writer: string, content: string, board: BoardEntity = null) {
    const reply = new ReplyEntity();
    reply.content = content;
    reply.writer = writer;
    if (board !== null) reply.board = board;
    return reply;
  }
}
