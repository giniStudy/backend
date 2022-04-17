import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { BoardRepository } from './entity/board.repository';
import { ReplyEntity } from './entity/reply.entity';
import { ReplyRepository } from './entity/reply.repository';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity) private boardRepository: BoardRepository,
    @InjectRepository(ReplyEntity) private replyRepository: ReplyRepository,
  ) {}

  getBoard(boardId: string): Promise<BoardEntity> {
    return this.boardRepository.findOneById(boardId);
  }

  getAllBoards(): Promise<BoardEntity[]> {
    return this.boardRepository.find();
  }

  saveBoard(board: BoardEntity): Promise<BoardEntity> {
    return this.boardRepository.save(board);
  }

  async saveReply(reply: ReplyEntity): Promise<ReplyEntity> {
    return this.replyRepository.save(reply);
  }
}
