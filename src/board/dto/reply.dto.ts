import { BoardDto } from './board.dto';
import { IsNotEmpty } from 'class-validator';

export class ReplyDto {
  id: number;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  writer: string;
  board: BoardDto;
}
