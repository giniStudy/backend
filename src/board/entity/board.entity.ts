import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReplyEntity } from './reply.entity';
import { STATUS } from 'interfaces';

@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  writer: string;

  @Column({ default: STATUS.PUBLIC })
  status: STATUS;

  @CreateDateColumn({ name: 'create_date', comment: '생성일' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'update_date', comment: '수정일' })
  updatedDate: Date;

  @OneToMany(() => ReplyEntity, (reply) => reply.board, { nullable: true })
  replys: ReplyEntity[];

  static from(writer: string, title: string, content: string) {
    const board = new BoardEntity();
    board.writer = writer;
    board.title = title;
    board.content = content;
    return board;
  }
}
