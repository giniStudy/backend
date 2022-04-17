import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from './entity/board.entity';
import { ReplyEntity } from './entity/reply.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':boardId')
  async getBoard(@Param() boardId: string): Promise<BoardEntity> {
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

  @Post('/reply')
  async saveReply(
    @Body() reply: ReplyEntity,
    @Param() boardId: string,
  ): Promise<BoardEntity> {
    const board = await this.boardService.getBoard(boardId);
    const savedReply = await this.boardService.saveReply(reply);
    board.replys.push(savedReply);
    return await this.boardService.saveBoard(board);
  }
}
