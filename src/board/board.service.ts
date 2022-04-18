import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { BoardRepository } from './entity/board.repository';
import { ReplyEntity } from './entity/reply.entity';
import { ReplyRepository } from './entity/reply.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity) private boardRepository: BoardRepository,
    @InjectRepository(ReplyEntity) private replyRepository: ReplyRepository,
  ) {}

  getBoard(boardId: number): Promise<BoardEntity> {
    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['replys'],
    });
  }

  getAllBoards(): Promise<BoardEntity[]> {
    return this.boardRepository.find();
  }

  saveBoard(board: BoardEntity): Promise<BoardEntity> {
    return this.boardRepository.save(board);
  }

  modifyBoard(boardId: number, board: BoardEntity): Promise<UpdateResult> {
    return this.boardRepository.update(boardId, board);
  }

  async saveReply(reply: ReplyEntity): Promise<ReplyEntity> {
    return this.replyRepository.save(reply);
  }
}
