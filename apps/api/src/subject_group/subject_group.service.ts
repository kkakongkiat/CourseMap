import { Injectable } from '@nestjs/common';
import { CreateSubjectGroupDto } from './dto/create-subject_group.dto';
import { UpdateSubjectGroupDto } from './dto/update-subject_group.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubjectGroupService {
  constructor(private prisma: PrismaService) {}

  create(createSubjectGroupDto: CreateSubjectGroupDto) {
    return this.prisma.subject_group.create({
      data: createSubjectGroupDto,
    });
  }

  findAll() {
    return this.prisma.subject_group.findMany();
  }

  findOne(id: number) {
    return this.prisma.subject_group.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSubjectGroupDto: UpdateSubjectGroupDto) {
    return this.prisma.subject_group.update({
      where: { id },
      data: updateSubjectGroupDto,
    });
  }

  remove(id: number) {
    return this.prisma.subject_group.delete({
      where: { id },
    });
  }
}
