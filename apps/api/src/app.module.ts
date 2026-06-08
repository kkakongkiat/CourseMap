import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FacultyModule } from './faculty/faculty.module';
import { DepartmentModule } from './department/department.module';
import { CourseModule } from './course/course.module';
import { SubjectGroupModule } from './subject_group/subject_group.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FacultyModule,
    DepartmentModule,
    CourseModule,
    SubjectGroupModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}