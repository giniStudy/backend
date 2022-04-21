import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from './entity/board.entity';
import { ReplyEntity } from './entity/reply.entity';
import { UpdateResult } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { ReplyDto } from './dto/reply.dto';

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
  async saveBoard(@Body() boardDto: BoardDto): Promise<BoardEntity> {
    return await this.boardService.saveBoard(boardDto);
  }

  @Patch('/:boardId')
  async modifyBoard(
    @Param('boardId') boardId: number,
    @Body() boardDto: BoardDto,
  ): Promise<UpdateResult> {
    return await this.boardService.modifyBoard(boardId, boardDto);
  }

  @Post('/reply/:boardId')
  async saveReply(
    @Body() replyDto: ReplyDto,
    @Param('boardId') boardId: number,
  ): Promise<ReplyEntity> {
    const board = await this.boardService.getBoard(boardId);
    const savedReply = await this.boardService.saveReply(replyDto);
    board.replys.push(savedReply);
    await this.boardService.saveBoard(board);
    return savedReply;
  }
}
