import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { BoardDto } from './dto/board.dto';
import { ReplyDto } from './dto/reply.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/:boardId')
  async getBoard(
    @Param('boardId', ParseIntPipe, ParseIntPipe) boardId: number,
  ): Promise<BoardDto> {
    return await this.boardService.getBoard(boardId);
  }

  @Get()
  async getAllBoards(): Promise<BoardDto[]> {
    return await this.boardService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async saveBoard(@Body() boardDto: BoardDto): Promise<BoardDto> {
    return await this.boardService.saveBoard(boardDto);
  }

  @Patch('/:boardId')
  async modifyBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() boardDto: BoardDto,
  ): Promise<UpdateResult> {
    return await this.boardService.modifyBoard(boardId, boardDto);
  }

  @Delete('/:boardId')
  async deleteBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<DeleteResult> {
    return await this.boardService.deleteBoard(boardId);
  }

  @Post('/reply/:boardId')
  @UsePipes(ValidationPipe)
  async saveReply(
    @Body() replyDto: ReplyDto,
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<ReplyDto> {
    const board = await this.boardService.getBoard(boardId);
    const savedReply = await this.boardService.saveReply(boardId, replyDto);
    board.replys.push(savedReply);
    await this.boardService.saveBoard(board);
    return savedReply;
  }

  @Patch('/reply/:replyId')
  @UsePipes(ValidationPipe)
  async modifyReply(
    @Param('replyId', ParseIntPipe) replyId: number,
    @Body() replyDto: ReplyDto,
  ): Promise<UpdateResult> {
    return await this.boardService.modifyReply(replyId, replyDto);
  }

  @Delete('reply/:replyId')
  async deleteReply(
    @Param('replyId', ParseIntPipe) replyId: number,
  ): Promise<DeleteResult> {
    return await this.boardService.deleteReply(replyId);
  }
}
