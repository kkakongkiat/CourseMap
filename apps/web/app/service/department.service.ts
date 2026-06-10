// กำหนด URL ของ API (แนะนำให้ดึงจาก Environment Variable ในใช้งานจริง เช่น process.env.NEXT_PUBLIC_API_URL)
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/department`;

export interface Department {
  id: number;
  thai_name?: string;
  eng_name?: string;
  faculty_id?: number;
}

export const departmentService = {
  /**
   * ดึงข้อมูลภาควิชาทั้งหมด (GET /department)
   */
  async getAll(): Promise<Department[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch departments');
    }
    return response.json();
  },

  /**
   * ดึงข้อมูลภาควิชาตาม ID (GET /department/:id)
   * @param id รหัสของภาควิชา
   */
  async getById(id: number): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch department with id ${id}`);
    }
    return response.json();
  },

  /**
   * สร้างข้อมูลภาควิชาใหม่ (POST /department)
   * @param data ข้อมูลภาควิชาที่ต้องการสร้าง
   */
  async create(data: Omit<Department, 'id'>): Promise<Department> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create department');
    }
    return response.json();
  },

  /**
   * อัปเดตข้อมูลภาควิชา (PATCH /department/:id)
   * @param id รหัสของภาควิชา
   * @param data ข้อมูลภาควิชาที่ต้องการแก้ไข
   */
  async update(id: number, data: Partial<Omit<Department, 'id'>>): Promise<Department> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update department with id ${id}`);
    }
    return response.json();
  },

  /**
   * ลบข้อมูลภาควิชา (DELETE /department/:id)
   * @param id รหัสของภาควิชา
   */
  async remove(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete department with id ${id}`);
    }
  }
};

export default departmentService;