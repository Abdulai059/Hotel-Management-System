import { FILTER_ALL } from "@/lib/roomFilters";
import FilterButton from "./FilterButton";
import { RoomStatus } from "@/hooks/types";

export default function RoomFilter({ filterStatus, onChange }) {
  return (
    <div className="flex gap-3">
      <FilterButton active={filterStatus === FILTER_ALL} onClick={() => onChange(FILTER_ALL)}>
        All
      </FilterButton>

      <FilterButton active={filterStatus === RoomStatus.AVAILABLE} onClick={() => onChange(RoomStatus.AVAILABLE)}>
        Available
      </FilterButton>

      <FilterButton active={filterStatus === RoomStatus.OCCUPIED} onClick={() => onChange(RoomStatus.OCCUPIED)}>
        Occupied
      </FilterButton>

      <FilterButton active={filterStatus === RoomStatus.MAINTENANCE} onClick={() => onChange(RoomStatus.MAINTENANCE)}>
        Service
      </FilterButton>
    </div>
  );
}
