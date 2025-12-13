import { useQuery } from '@tanstack/react-query';
import { classApi } from '@/api/services';
import { transformClassResponse } from '@/api/transforms';

export function useStudioClasses(studioId: string) {
  return useQuery({
    queryKey: ['classes', 'studio', studioId],
    queryFn: async () => {
      const response = await classApi.getByStudio(studioId);
      return response.data.map(transformClassResponse);
    },
    enabled: !!studioId,
  });
}

export function useDancerClasses(dancerId: string) {
  return useQuery({
    queryKey: ['classes', 'dancer', dancerId],
    queryFn: async () => {
      const response = await classApi.getByDancer(dancerId);
      return response.data.map(transformClassResponse);
    },
    enabled: !!dancerId,
  });
}
