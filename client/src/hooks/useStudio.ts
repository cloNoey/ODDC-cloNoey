import { useQuery } from '@tanstack/react-query';
import { studioApi } from '@/api/services';
import { transformStudioResponse } from '@/api/transforms';

export function useStudioList() {
  return useQuery({
    queryKey: ['studios'],
    queryFn: async () => {
      const response = await studioApi.getList();
      return response.data.map(transformStudioResponse);
    },
  });
}

export function useStudio(studioId: string) {
  return useQuery({
    queryKey: ['studio', studioId],
    queryFn: async () => {
      const response = await studioApi.getById(studioId);
      return transformStudioResponse(response.data);
    },
    enabled: !!studioId,
  });
}
