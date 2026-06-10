// กำหนด URL ของ API (แนะนำให้ดึงจาก Environment Variable ในใช้งานจริง เช่น process.env.NEXT_PUBLIC_API_URL)
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/faculty`;

export interface Faculty {
  id: number;
  thai_name?: string;
  eng_name?: string;
}

export const facultyService = {
  /**
   * ดึงข้อมูลคณะทั้งหมด (GET /faculty)
   */
  async getAll(): Promise<Faculty[]> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch faculties');
    }
    return response.json();
  },

  /**
   * ดึงข้อมูลคณะตาม ID (GET /faculty/:id)
   * @param id รหัสของคณะ
   */
  async getById(id: number): Promise<Faculty> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch faculty with id ${id}`);
    }
    return response.json();
  },

  /**
   * สร้างข้อมูลคณะใหม่ (POST /faculty)
   * @param data ข้อมูลคณะที่ต้องการสร้าง
   */
  async create(data: Omit<Faculty, 'id'>): Promise<Faculty> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create faculty');
    }
    return response.json();
  },

  /**
   * อัปเดตข้อมูลคณะ (PATCH /faculty/:id)
   * @param id รหัสของคณะ
   * @param data ข้อมูลคณะที่ต้องการแก้ไข
   */
  async update(id: number, data: Partial<Omit<Faculty, 'id'>>): Promise<Faculty> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Failed to update faculty with id ${id}`);
    }
    return response.json();
  },

  /**
   * ลบข้อมูลคณะ (DELETE /faculty/:id)
   * @param id รหัสของคณะ
   */
  async remove(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete faculty with id ${id}`);
    }
  }
};

export default facultyService;