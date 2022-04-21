import { BoardDto } from './board.dto';

export class ReplyDto {
  id: number;
  content: string;
  writer: string;
  board: BoardDto;
}
