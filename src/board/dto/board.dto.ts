import { ReplyDto } from './reply.dto';

export class BoardDto {
  id: number;
  title: string;
  content: string;
  writer: string;
  replys: ReplyDto[];
}
