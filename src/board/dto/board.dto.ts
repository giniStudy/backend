import { ReplyDto } from './reply.dto';
import { STATUS } from 'interfaces';
import { IsNotEmpty } from 'class-validator';

export class BoardDto {
  id: number;
  @IsNotEmpty()
  title: string;
  content: string;
  @IsNotEmpty()
  writer: string;
  status: STATUS;
  replys: ReplyDto[];
}
