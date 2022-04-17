import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { ReplyEntity } from './entity/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity, ReplyEntity])],
  providers: [BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
