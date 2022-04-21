import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { BoardRepository } from './entity/board.repository';
import { ReplyEntity } from './entity/reply.entity';
import { ReplyRepository } from './entity/reply.repository';
import { UpdateResult } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { ReplyDto } from './dto/reply.dto';

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

  saveBoard(boardDto: BoardDto): Promise<BoardEntity> {
    const { writer, title, content } = boardDto;
    const board = BoardEntity.from(writer, title, content);
    return this.boardRepository.save(board);
  }

  modifyBoard(boardId: number, boardDto: BoardDto): Promise<UpdateResult> {
    const { writer, title, content } = boardDto;
    const board = BoardEntity.from(writer, title, content);
    return this.boardRepository.update(boardId, board);
  }

  async saveReply(replyDto: ReplyDto): Promise<ReplyEntity> {
    const { writer, content } = replyDto;
    const reply = ReplyEntity.from(writer, content);
    return this.replyRepository.save(reply);
  }
}
