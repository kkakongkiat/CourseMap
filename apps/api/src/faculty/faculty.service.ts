import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FacultyService {

  constructor(private prisma: PrismaService) {}
  
  create(createFacultyDto: CreateFacultyDto) {
    return this.prisma.faculty.create({
      data: createFacultyDto,
    });
  }

  findAll() {
    return this.prisma.faculty.findMany();
  }

  findOne(id: number) {
    return this.prisma.faculty.findUnique({
      where: { id },
    });
  }

  update(id: number, updateFacultyDto: UpdateFacultyDto) {
    return this.prisma.faculty.update({
      where: { id },
      data: updateFacultyDto,
    });
  }

  remove(id: number) {
    return this.prisma.faculty.delete({
      where: { id },
    });
  }
}
