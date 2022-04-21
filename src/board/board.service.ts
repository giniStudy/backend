import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getBoard(boardId: number): Promise<BoardDto> {
    const found = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['replys'],
    });
    if (!found) {
      throw new NotFoundException(`can't find board data boardId : ${boardId}`);
    }
    return found;
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

    try {
      const result = this.boardRepository.update(boardId, board);
      return result;
    } catch (e) {
      return e;
    }
  }

  async deleteBoard(boardId: number): Promise<DeleteResult> {
    const find = await this.boardRepository.findOne({ where: { id: boardId } });
    if (!find) {
      throw new NotFoundException(`can't find board data boardId : ${boardId}`);
    }

    try {
      const result = this.boardRepository.delete({ id: boardId });
      return result;
    } catch (e) {
      return e;
    }
  }

  async saveReply(boardId: number, replyDto: ReplyDto): Promise<ReplyDto> {
    const { writer, content } = replyDto;

    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    if (!board) {
      throw new NotFoundException(`can't find board data boardId : ${boardId}`);
    }

    const reply = ReplyEntity.from(writer, content, board);
    try {
      const result = this.replyRepository.save(reply);
      return result;
    } catch (e) {
      return e;
    }
  }

  modifyReply(replyId: number, replyDto: ReplyDto): Promise<UpdateResult> {
    const { writer, content } = replyDto;
    const reply = ReplyEntity.from(writer, content);
    try {
      const result = this.replyRepository.update(replyId, reply);
      return result;
    } catch (e) {
      return e;
    }
  }

  async deleteReply(replyId: number): Promise<DeleteResult> {
    const reply = await this.replyRepository.findOne({
      where: { id: replyId },
    });

    if (!reply) {
      throw new NotFoundException(`can't find reply data replyId : ${reply}`);
    }

    try {
      const result = this.replyRepository.delete({ id: replyId });
      return result;
    } catch (e) {
      return e;
    }
  }
}
