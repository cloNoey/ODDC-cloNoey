import { apiClient } from './client';

// Studio API
export const studioApi = {
  getList: () => apiClient.get('/studio/list'),
  getById: (id: string) => apiClient.get(`/studio/${id}`),
};

// Dancer API
export const dancerApi = {
  getById: (id: string) => apiClient.get(`/dancer/${id}`),
};

// Class API
export const classApi = {
  getByStudio: (studioId: string) => apiClient.get(`/class/studio/${studioId}`),
  getByDancer: (dancerId: string) => apiClient.get(`/class/dancer/${dancerId}`),
};

// Search API
export const searchApi = {
  search: (keyword: string) => apiClient.get(`/search?keyword=${encodeURIComponent(keyword)}`),
};
