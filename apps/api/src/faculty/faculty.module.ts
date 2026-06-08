import { Module } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FacultyController],
  providers: [FacultyService, PrismaService],
})
export class FacultyModule {}
