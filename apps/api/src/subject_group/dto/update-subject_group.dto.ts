import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectGroupDto } from './create-subject_group.dto';

export class UpdateSubjectGroupDto extends PartialType(CreateSubjectGroupDto) {}
