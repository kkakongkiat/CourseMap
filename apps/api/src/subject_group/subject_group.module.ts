import { Module } from '@nestjs/common';
import { SubjectGroupService } from './subject_group.service';
import { SubjectGroupController } from './subject_group.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SubjectGroupController],
  providers: [SubjectGroupService, PrismaService],
})
export class SubjectGroupModule {}
