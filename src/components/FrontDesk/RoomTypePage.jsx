import { useState } from "react";

const ROOMS = [
  {
    id: 1,
    name: "Standard",
    size: 25,
    bed: "Queen Bed",
    guests: 2,
    status: "Occupied",
    available: 22,
    total: 30,
    price: 100,
    description:
      "Comfortable, affordable stay for solo travelers or couples. Queen bed, en-suite bathroom, work desk, essential amenities.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=200&q=80",
    ],
    features: [
      "Private balcony (where applicable)",
      "Work desk with ergonomic chair",
      "Spacious layout with a modern design",
      "Large windows offering city or garden views",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "In-room safe",
      "Mini-fridge",
      "Flat-screen TV",
      "Air conditioning",
      "Coffee/tea maker",
    ],
    amenities: [
      "Complimentary bottled water",
      "Luxury toiletries",
      "Coffee and tea making facilities",
      "Hairdryer",
      "Premium bedding and linens",
      "Bathrobe and slippers",
      "Ensuite bathroom with shower and bathtub",
      "24-hour room service",
    ],
  },
  {
    id: 2,
    name: "Deluxe",
    size: 35,
    bed: "King Bed",
    guests: 2,
    status: "Available",
    available: 18,
    total: 25,
    price: 150,
    description:
      "More space and luxury. King bed, separate seating, larger desk, 55-inch TV. En-suite bathroom with bathtub and shower.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=200&q=80",
    ],
    features: [
      "Private balcony (where applicable)",
      "Work desk with ergonomic chair",
      "Spacious layout with a modern design",
      "Large windows offering city or garden views",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "In-room safe",
      "Mini-fridge",
      "Flat-screen TV",
      "Air conditioning",
      "Coffee/tea maker",
    ],
    amenities: [
      "Complimentary bottled water",
      "Luxury toiletries",
      "Coffee and tea making facilities",
      "Hairdryer",
      "Premium bedding and linens",
      "Bathrobe and slippers",
      "Ensuite bathroom with shower and bathtub",
      "24-hour room service",
    ],
  },
  {
    id: 3,
    name: "Suite",
    size: 50,
    bed: "King Bed",
    guests: 3,
    status: "Available",
    available: 8,
    total: 10,
    price: 250,
    description:
      "Spacious and private with separate living and sleeping areas. King bed, furnished living room, kitchenette — ideal for extended stays.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=200&q=80",
    ],
    features: [
      "Private balcony (where applicable)",
      "Work desk with ergonomic chair",
      "Spacious layout with a modern design",
      "Large windows offering city or garden views",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "In-room safe",
      "Mini-fridge",
      "Flat-screen TV",
      "Air conditioning",
      "Coffee/tea maker",
    ],
    amenities: [
      "Complimentary bottled water",
      "Luxury toiletries",
      "Coffee and tea making facilities",
      "Hairdryer",
      "Premium bedding and linens",
      "Bathrobe and slippers",
      "Ensuite bathroom with shower and bathtub",
      "24-hour room service",
    ],
  },
  {
    id: 4,
    name: "Family",
    size: 45,
    bed: "2 Queen Beds",
    guests: 4,
    status: "Occupied",
    available: 12,
    total: 15,
    price: 200,
    description:
      "Designed for comfort and practicality. Two queen beds, bunk beds accommodate up to 6 guests. En-suite bathroom, seating area, 50-inch TV.",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=200&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=200&q=80",
    ],
    features: [
      "Private balcony (where applicable)",
      "Work desk with ergonomic chair",
      "Spacious layout with a modern design",
      "Large windows offering city or garden views",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "In-room safe",
      "Mini-fridge",
      "Flat-screen TV",
      "Air conditioning",
      "Coffee/tea maker",
    ],
    amenities: [
      "Complimentary bottled water",
      "Luxury toiletries",
      "Coffee and tea making facilities",
      "Hairdryer",
      "Premium bedding and linens",
      "Bathrobe and slippers",
      "Ensuite bathroom with shower and bathtub",
      "24-hour room service",
    ],
  },
  {
    id: 5,
    name: "Single",
    size: 20,
    bed: "Single Bed",
    guests: 1,
    status: "Available",
    available: 17,
    total: 20,
    price: 70,
    description:
      "Features a single bed, en-suite bathroom, work desk, and essential amenities for a practical and functional stay.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200&q=80",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=200&q=80",
    ],
    features: [
      "Private balcony (where applicable)",
      "Work desk with ergonomic chair",
      "Spacious layout with a modern design",
      "Large windows offering city or garden views",
    ],
    facilities: [
      "High-speed Wi-Fi",
      "In-room safe",
      "Mini-fridge",
      "Flat-screen TV",
      "Air conditioning",
      "Coffee/tea maker",
    ],
    amenities: [
      "Complimentary bottled water",
      "Luxury toiletries",
      "Coffee and tea making facilities",
      "Hairdryer",
      "Premium bedding and linens",
      "Bathrobe and slippers",
      "Ensuite bathroom with shower and bathtub",
      "24-hour room service",
    ],
  },
];

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="shrink-0 text-[#9dc43b]"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MetaIcon = ({ type }) => {
  if (type === "size")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
      </svg>
    );
  if (type === "bed")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 4v16M22 4v16M2 12h20M7 12V8a1 1 0 011-1h8a1 1 0 011 1v4" />
      </svg>
    );
  if (type === "guests")
    return (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
      </svg>
    );
  return null;
};

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${status === "Available" ? "bg-[#e7f68f] text-gray-700" : "bg-orange-100 text-orange-600"}`}
  >
    {status}
  </span>
);

const FacilityChip = ({ label }) => (
  <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1.5 text-[11px] text-gray-500">
    <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
    {label}
  </div>
);

export default function RoomTypePage() {
  const [selected, setSelected] = useState(ROOMS[1]);
  const [search, setSearch] = useState("");
  const [activeImage, setActiveImage] = useState(ROOMS[1].image);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = ROOMS.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (room) => {
    setSelected(room);
    setActiveImage(room.image);
    setShowDetail(true);
  };

  return (
    <div className="mx-auto flex h-screen max-w-[1600px] gap-12 bg-white p-6 font-sans text-gray-900">
      {/* ── LEFT LIST ── */}
      <div className="flex w-225 shrink-0 flex-col border-r border-gray-100">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-white px-3 py-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search room type, number, etc."
              className="flex-1 bg-transparent text-[11px] text-gray-600 placeholder-gray-400 outline-none"
            />
          </div>
          <span className="text-[11px] text-gray-400">Sort by:</span>
          <select className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[11px] text-gray-600 focus:outline-none">
            <option>Popular</option>
            <option>Price</option>
            <option>Name</option>
          </select>
          <select className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[11px] text-gray-600 focus:outline-none">
            <option>All Type</option>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
          </select>
          <button className="rounded-lg bg-[#9dc43b] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#8ab534]">
            Add Room
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((room) => (
            <div
              key={room.id}
              onClick={() => handleSelect(room)}
              className={`flex cursor-pointer gap-4 border-b border-gray-100 p-3 transition-colors hover:bg-gray-50 ${selected.id === room.id ? "bg-[#f7fdf0]" : "bg-white"}`}
            >
              <img src={room.image} alt={room.name} className="h-30 w-35 shrink-0 rounded-sm object-cover" />
              <div className="flex flex-col">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900">{room.name}</h3>
                  <StatusBadge status={room.status} />
                </div>
                <div className="mb-1.5 flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <MetaIcon type="size" />
                    {room.size} m²
                  </span>
                  <span className="flex items-center gap-1">
                    <MetaIcon type="bed" />
                    {room.bed}
                  </span>
                  <span className="flex items-center gap-1">
                    <MetaIcon type="guests" />
                    {room.guests} guests
                  </span>
                </div>
                <p className="mb-2 line-clamp-2 text-[11px] leading-relaxed text-gray-500">{room.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Availability: {room.available}/{room.total} Rooms
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    ${room.price}
                    <span className="text-[10px] font-normal text-gray-400">/night</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT DETAIL ── */}
      <div className={`flex-1 rounded-xl bg-gray-100 ${showDetail || "hidden lg:block"}`}>
        {/* Detail header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl border-b border-gray-100 bg-gray-100 px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetail(false)}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] text-gray-400 hover:bg-gray-200 lg:hidden"
            >
              ← Back
            </button>
            <span className="text-xs font-semibold text-gray-400">Room Detail</span>
          </div>
          <button className="rounded-lg bg-[#e7f68f] px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-[#d4e87a]">
            Edit
          </button>
        </div>

        <div className="px-4 py-4 sm:px-6">
          {/* Title */}
          <div className="mb-1 flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{selected.name} Room</h2>
            <StatusBadge status={selected.status} />
          </div>
          <p className="mb-4 text-xs text-gray-400">
            Occupied: {selected.available}/{selected.total} Rooms
          </p>

          {/* Gallery */}
          <div className="mb-4 flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {[selected.image, ...(selected.gallery || [])].map((img, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${activeImage === img ? "border-[#9dc43b]" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-[62px] w-[62px] object-cover sm:h-[70px] sm:w-[70px]" />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200">
              <img src={activeImage} alt={selected.name} className="h-56 w-full object-cover sm:h-72" />
            </div>
          </div>

          {/* Specs */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <MetaIcon type="size" />
              {selected.size} m²
            </span>
            <span className="flex items-center gap-1.5">
              <MetaIcon type="bed" />
              {selected.bed}
            </span>
            <span className="flex items-center gap-1.5">
              <MetaIcon type="guests" />
              {selected.guests} guests
            </span>
          </div>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-gray-600">{selected.description}</p>

          {/* Features */}
          <div className="mb-5">
            <h4 className="mb-3 text-sm font-bold text-gray-900">Features</h4>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {selected.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckIcon />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mb-5">
            <h4 className="mb-3 text-sm font-bold text-gray-900">Facilities</h4>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {selected.facilities.map((f) => (
                <FacilityChip key={f} label={f} />
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-gray-900">Amenities</h4>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
              {selected.amenities.map((a) => (
                <div key={a} className="flex items-start gap-2 text-xs text-gray-600">
                  <CheckIcon />
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
