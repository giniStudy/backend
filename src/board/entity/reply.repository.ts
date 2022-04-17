import { EntityRepository, Repository } from 'typeorm';
import { ReplyEntity } from './reply.entity';

@EntityRepository(ReplyEntity)
export class ReplyRepository extends Repository<ReplyEntity> {}
