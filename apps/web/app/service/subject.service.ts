const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/subject`;

export interface Subject {
  id: number;
  subject_code?: string;
  thai_name?: string;
  eng_name?: string;
  detail?: string;
  credit?: number;
  group_id?: number;
  require_subjects?: {
    id: number;
    subject_id?: number | null;
    require_subject_id?: number | null;
    required_subject?: Subject | null;
    subject?: Subject | null;
  }[];
}

export interface CourseSubjectItem {
  id: number;
  course_id?: number | null;
  subject_id?: number | null;
  year?: number | null;
  semester?: number | null;
  subject: Subject;
}

export const subjectService = {

    async getById(id: number): Promise<Subject> {
        const response = await fetch(`${API_BASE_URL}/${id}`); 
        if (!response.ok) {
            throw new Error(`Failed to fetch subject with id ${id}`);
        }
        return response.json();
    },

    async getByCourseId(courseId: number): Promise<CourseSubjectItem[]> {
        const response = await fetch(`${API_BASE_URL}/course/${courseId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch subjects for course with id ${courseId}`);
        }
        return response.json();
    },

    async getRequiredSubjects(subjectId: number): Promise<Subject[]> {
        const response = await fetch(`${API_BASE_URL}/${subjectId}/require`);
        if (!response.ok) {
            throw new Error(`Failed to fetch required subjects for subject with id ${subjectId}`);
        }
        return response.json();
    }

}

export default subjectService;