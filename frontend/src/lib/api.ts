
const API_BASE = 'http://localhost:5000/api';

export interface Blog {
  id: string;
  title: string;
  subject: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
}

export interface BlogInput {
  title: string;
  subject: string;
  content: string;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json as T;
}

export const api = {
  getBlogs: () => request<Blog[]>('/blogs'),
  getBlog: (id: string) => request<Blog>(`/blogs/${id}`),
  createBlog: (data: BlogInput) =>
    request<Blog>('/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: string, data: BlogInput) =>
    request<Blog>(`/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: string) =>
    request<{ message: string }>(`/blogs/${id}`, { method: 'DELETE' }),
  likeBlog: (id: string) =>
    request<Blog>(`/blogs/${id}/like`, { method: 'POST' }),
  dislikeBlog: (id: string) =>
    request<Blog>(`/blogs/${id}/dislike`, { method: 'POST' }),
  sendContact: (data: { name: string; email: string; message: string }) =>
    request<{ message: string; submitted: boolean }>('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
