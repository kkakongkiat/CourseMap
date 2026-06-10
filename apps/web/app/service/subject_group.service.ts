const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/subject-group`;

export interface Subject_Group {
    id: number;
    thai_name?: string;
    eng_name?: string;
}

export const subjectGroupService = {

    async getById(id: number): Promise<Subject_Group> {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch subject group with id ${id}`);
        }
        return response.json();
    }

}

export default subjectGroupService;