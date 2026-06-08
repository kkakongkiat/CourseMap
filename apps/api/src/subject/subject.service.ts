import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: createSubjectDto,
    });
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  findOne(id: number) {
    return this.prisma.subject.findUnique({
      where: { id },
    });
  }

  findByCode(subject_code: string) {
    return this.prisma.subject.findFirst({
      where: { subject_code },
    });
  }

  findByCourse(courseId: number) {
    return this.prisma.course_subject.findMany({
      where: { course_id: courseId },
      include: {
        subject: true, // ดึงข้อมูลรายละเอียดวิชามาด้วย
      },
      orderBy: [
        { year: 'asc' },      // เรียงตามชั้นปี
        { semester: 'asc' },  // และเรียงตามเทอม
      ],
    });
  }

  findRequiredSubjects(subjectId: number) {
    return this.prisma.require_subject.findMany({
      where: { subject_id: subjectId },
      include: {
        required_subject: true,
      },
    });
  }
  

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  remove(id: number) {
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
