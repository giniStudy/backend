import { ReplyDto } from './reply.dto';
import { STATUS } from 'interfaces';

export class BoardDto {
  id: number;
  title: string;
  content: string;
  writer: string;
  status: STATUS;
  replys: ReplyDto[];
}
