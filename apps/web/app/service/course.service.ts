// กำหนด URL ของ API (แนะนำให้ดึงจาก Environment Variable ในใช้งานจริง เช่น process.env.NEXT_PUBLIC_API_URL)
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/course`;

export interface Course {
  id: number;
  thai_name?: string;
  eng_name?: string;
  department_id?: number;
}

export const courseService = {
  /**
   * ดึงข้อมูลหลักสูตรทั้งหมด (GET /course)
   */
  async getAll(): Promise<Course[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return response.json();
  },

  /**
   * ดึงข้อมูลหลักสูตรตาม ID (GET /course/:id)
   * @param id รหัสของหลักสูตร
   */
  async getById(id: number): Promise<Course> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course with id ${id}`);
    }
    return response.json();
  },

  /**
   * สร้างข้อมูลหลักสูตรใหม่ (POST /course)
   * @param data ข้อมูลหลักสูตรที่ต้องการสร้าง
   */
  async create(data: Omit<Course, 'id'>): Promise<Course> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create course');
    }
    return response.json();
  },

  /**
   * อัปเดตข้อมูลหลักสูตร (PATCH /course/:id)
   * @param id รหัสของหลักสูตร
   * @param data ข้อมูลหลักสูตรที่ต้องการแก้ไข
   */
  async update(id: number, data: Partial<Omit<Course, 'id'>>): Promise<Course> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update course with id ${id}`);
    }
    return response.json();
  },

  /**
   * ลบข้อมูลหลักสูตร (DELETE /course/:id)
   * @param id รหัสของหลักสูตร
   */
  async remove(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete course with id ${id}`);
    }
  }
};

export default courseService;
