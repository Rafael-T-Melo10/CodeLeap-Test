import axios from 'axios';
import type { Post } from './types.ts/Posts';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

type ListResponse = { results: Post[]; next: string | null };

const unwrapList = (data: any): ListResponse =>
  Array.isArray(data)
    ? { results: data as Post[], next: null }
    : { results: (data?.results ?? []) as Post[], next: data?.next ?? null };

function toApiUrl(url?: string) {
  if (!url) return '';
  try {
    const u = new URL(url);
    if (u.hostname === 'dev.codeleap.co.uk') {
      const path = u.pathname.replace(/^\/careers/, '') || '/';
      return '/api' + path + (u.search || '');
    }
    return url;
  } catch {
    return url;
  }
}

export async function listPosts(url?: string): Promise<ListResponse> {
  const finalUrl = toApiUrl(url);
  const { data } = await api.get(finalUrl || '');
  return unwrapList(data);
}

export async function createPost(p: Pick<Post,'username'|'title'|'content'>): Promise<Post> {
  const { data } = await api.post('', p);
  return data as Post;
}

export async function updatePost(id: number, patch: Partial<Pick<Post,'title'|'content'>>): Promise<Post> {
  const { data } = await api.patch(`${id}/`, patch);
  return data as Post;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`${id}/`);
}
