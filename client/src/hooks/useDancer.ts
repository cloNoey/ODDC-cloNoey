import { useQuery } from '@tanstack/react-query';
import { dancerApi } from '@/api/services';
import { transformDancerResponse } from '@/api/transforms';

export function useDancer(dancerId: string) {
  return useQuery({
    queryKey: ['dancer', dancerId],
    queryFn: async () => {
      const response = await dancerApi.getById(dancerId);
      return transformDancerResponse(response.data);
    },
    enabled: !!dancerId,
  });
}
