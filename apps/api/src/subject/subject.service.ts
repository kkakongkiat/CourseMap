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
    return this.prisma.subject.findMany({
      orderBy: { id: 'asc' }, // หรือเปลี่ยนเป็น { subject_code: 'asc' } เพื่อเรียงตามรหัสวิชา
    });
  }

  findOne(id: number) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: {
            require_subjects: {
              include: {
                required_subject: true,
              },
              orderBy: { id: 'asc' }, // เรียงวิชาบังคับก่อนตาม id
            }
      }
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
        subject: { // ดึงข้อมูลรายละเอียดวิชา พร้อมวิชาบังคับก่อน
          include: {
            require_subjects: { // ใช้ชื่อ require_subjects ให้ตรงกับใน schema.prisma
              include: {
                required_subject: true,
              },
              orderBy: { id: 'asc' }, // เรียงวิชาบังคับก่อนตาม id
            }
          }
        }
      },
      orderBy: [
        { year: 'asc' },      // เรียงตามชั้นปี
        { semester: 'asc' },  // และเรียงตามเทอม
        { subject_id: 'asc' }, 
      ],
    });
  }

  findRequiredSubjects(subjectId: number) {
    return this.prisma.require_subject.findMany({
      where: { subject_id: subjectId },
      include: {
        required_subject: true,
      },
      orderBy: { subject_id: 'asc' }, // เรียงผลลัพธ์ตาม id
    });
  }

  findBySubjectGroups(group_id: number) {
    return this.prisma.subject.findMany({
      where: { group_id },
      orderBy: { id: 'asc' },
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
