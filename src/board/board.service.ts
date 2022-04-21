import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { BoardRepository } from './entity/board.repository';
import { ReplyEntity } from './entity/reply.entity';
import { ReplyRepository } from './entity/reply.repository';
import { UpdateResult, DeleteResult } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { ReplyDto } from './dto/reply.dto';
import { STATUS } from 'interfaces';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity) private boardRepository: BoardRepository,
    @InjectRepository(ReplyEntity) private replyRepository: ReplyRepository,
  ) {}

  getBoard(boardId: number): Promise<BoardDto> {
    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['replys'],
    });
  }

  getAllBoards(): Promise<BoardDto[]> {
    return this.boardRepository.find({ where: { status: STATUS.PUBLIC } });
  }

  saveBoard(boardDto: BoardDto): Promise<BoardDto> {
    const { writer, title, content } = boardDto;
    const board = BoardEntity.from(writer, title, content);
    return this.boardRepository.save(board);
  }

  modifyBoard(boardId: number, boardDto: BoardDto): Promise<UpdateResult> {
    const { writer, title, content } = boardDto;
    const board = BoardEntity.from(writer, title, content);
    return this.boardRepository.update(boardId, board);
  }

  deleteBoard(boardId: number): Promise<DeleteResult> {
    return this.boardRepository.delete({ id: boardId });
  }

  async saveReply(boardId: number, replyDto: ReplyDto): Promise<ReplyDto> {
    const { writer, content } = replyDto;
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    const reply = ReplyEntity.from(writer, content, board);
    return this.replyRepository.save(reply);
  }

  modifyReply(replyId: number, replyDto: ReplyDto): Promise<UpdateResult> {
    const { writer, content } = replyDto;
    const reply = ReplyEntity.from(writer, content);
    return this.replyRepository.update(replyId, reply);
  }

  deleteReply(replyId: number): Promise<DeleteResult> {
    return this.replyRepository.delete({ id: replyId });
  }
}
