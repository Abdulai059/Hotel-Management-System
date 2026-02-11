import { roomsService } from "@/services/roomsService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const roomsKeys = {
  all: ["rooms"],
  lists: () => [...roomsKeys.all, "list"],
  list: (filters) => [...roomsKeys.lists(), { filters }],
  details: () => [...roomsKeys.all, "detail"],
  detail: (id) => [...roomsKeys.details(), id],
};

export function useRooms() {
  return useQuery({
    queryKey: roomsKeys.lists(),
    queryFn: roomsService.getAllRooms,
    refetchInterval: 30000,
    staleTime: 10000,
  });
}

export function useRoom(id) {
  return useQuery({
    queryKey: roomsKeys.detail(id),
    queryFn: () => roomsService.getRoomById(id),
    enabled: !!id,
  });
}

function createMutation(mutationFn) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: roomsKeys.all });
    },
  });
}

export function useUpdateRoomStatus() {
  return createMutation(({ id, status }) => roomsService.updateRoomStatus(id, status));
}
