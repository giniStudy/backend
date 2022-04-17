import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './board/entity/board.entity';
import { ReplyEntity } from './board/entity/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'GINI',
      entities: [BoardEntity, ReplyEntity],
      synchronize: true,
    }),
    BoardModule,
  ],
})
export class AppModule {}
