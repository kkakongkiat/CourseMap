// Shared types ระหว่าง frontend และ backend
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}