import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from './entity/board.entity';
import { ReplyEntity } from './entity/reply.entity';
import { UpdateResult } from 'typeorm';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/:boardId')
  async getBoard(@Param('boardId') boardId: number): Promise<BoardEntity> {
    return await this.boardService.getBoard(boardId);
  }

  @Get()
  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardService.getAllBoards();
  }

  @Post()
  async saveBoard(@Body() board: BoardEntity): Promise<BoardEntity> {
    return await this.boardService.saveBoard(board);
  }

  @Patch('/:boardId')
  async modifyBoard(
    @Param('boardId') boardId: number,
    @Body() board: BoardEntity,
  ): Promise<UpdateResult> {
    return await this.boardService.modifyBoard(boardId, board);
  }

  @Post('/reply/:boardId')
  async saveReply(
    @Body() reply: ReplyEntity,
    @Param('boardId') boardId: number,
  ): Promise<ReplyEntity> {
    const board = await this.boardService.getBoard(boardId);
    const savedReply = await this.boardService.saveReply(reply);
    board.replys.push(savedReply);
    await this.boardService.saveBoard(board);
    return savedReply;
  }
}
