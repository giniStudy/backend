import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ReplyEntity } from './reply.entity';

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

  @CreateDateColumn({ name: 'create_date', comment: '생성일' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'update_date', comment: '수정일' })
  updatedDate: Date;

  @OneToMany((type) => ReplyEntity, (reply) => reply.board, { nullable: true })
  replys: ReplyEntity[];
}
