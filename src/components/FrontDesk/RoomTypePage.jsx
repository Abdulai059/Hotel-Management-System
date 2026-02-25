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
    price: 676,
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
    price: 1413.4,
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
    name: "Executive Standard",
    size: 35,
    bed: "King Bed",
    guests: 2,
    status: "Available",
    available: 10,
    total: 15,
    price: 860,
    description:
      "An elevated standard experience with premium furnishings, enhanced workspace, and superior amenities for the discerning business traveler.",
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
    name: "Executive Suite",
    size: 65,
    bed: "King Bed",
    guests: 3,
    status: "Available",
    available: 5,
    total: 8,
    price: 1106.1,
    description:
      "Spacious and private with separate living and sleeping areas. King bed, furnished living room, kitchenette — ideal for extended stays or executives.",
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
];

const IconCheck = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className="mt-0.5 shrink-0 text-[#9dc43b]"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const IconSize = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

const IconBed = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 4v16M22 4v16M2 12h20M7 12V8a1 1 0 011-1h8a1 1 0 011 1v4" />
  </svg>
);

const IconGuests = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    <path d="M16 3.13a4 4 0 010 7.75M21 21v-2a4 4 0 00-3-3.85" />
  </svg>
);

const BookingButton = ({ status, onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick && onClick();
    }}
    disabled={status === "Occupied"}
    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
      status === "Available"
        ? "cursor-pointer bg-[#9dc43b] text-white hover:bg-[#8ab534]"
        : "cursor-pointer bg-[#9dc43b] text-white hover:bg-[#8ab534]"
    }`}
  >
    {status === "Available" ? "Book Now" : "Book Now"}
  </button>
);

const RoomMeta = ({ size, bed, guests }) => (
  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
    <span className="flex items-center gap-1">
      <IconSize />
      {size} m²
    </span>
    <span className="flex items-center gap-1">
      <IconBed />
      {bed}
    </span>
    <span className="flex items-center gap-1">
      <IconGuests />
      {guests} guests
    </span>
  </div>
);

const CheckList = ({ items }) => (
  <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
    {items.map((item) => (
      <div key={item} className="flex items-start gap-2 text-xs text-gray-600">
        <IconCheck />
        {item}
      </div>
    ))}
  </div>
);

const FacilityChip = ({ label }) => (
  <div className="flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-2.5 py-1.5 text-xs text-gray-500">
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
    {label}
  </div>
);

const SectionHeading = ({ children }) => <h4 className="mb-3 text-sm font-bold text-gray-900">{children}</h4>;

const Select = ({ children }) => (
  <select className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-600 focus:outline-none">
    {children}
  </select>
);

export default function RoomTypePage() {
  const [selected, setSelected] = useState(ROOMS[1]);
  const [search, setSearch] = useState("");
  const [activeImage, setActiveImage] = useState(ROOMS[1].image);
  const [view, setView] = useState("list");

  const filtered = ROOMS.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (room) => {
    setSelected(room);
    setActiveImage(room.image);
    setView("detail");
  };

  const allImages = [selected.image, ...(selected.gallery ?? [])];

  return (
    <div className="flex h-screen overflow-hidden bg-white font-sans text-gray-900 md:gap-4">
      <div
        className={`flex w-full flex-col border-r border-gray-100 lg:flex lg:w-[1000px] lg:shrink-0 ${view === "detail" ? "hidden lg:flex" : "flex"}`}
      >
        <div className="flex shrink-0 flex-col gap-2 border-b border-gray-100 bg-white px-4 py-3">
          <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <IconSearch />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search room type, number, etc."
              className="flex-1 bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <span className="shrink-0 text-xs text-gray-400">Sort by:</span>
            <Select>
              <option>Popular</option>
              <option>Price</option>
              <option>Name</option>
            </Select>
            <Select>
              <option>All Type</option>
              <option>Standard</option>
              <option>Deluxe</option>
              <option>Suite</option>
            </Select>
            <button className="ml-auto shrink-0 rounded-lg bg-[#9dc43b] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#8ab534]">
              + Add Room
            </button>
          </div>
        </div>

        <ul className="flex-1 divide-y divide-gray-100 overflow-y-auto pt-10">
          {filtered.map((room) => (
            <li
              key={room.id}
              onClick={() => handleSelect(room)}
              className={`flex cursor-pointer gap-4 px-4 py-4 transition-colors hover:bg-gray-50 ${selected.id === room.id ? "bg-[#f7fdf0]" : "bg-white"}`}
            >
              <img src={room.image} alt={room.name} className="h-[100px] w-[120px] shrink-0 rounded-xl object-cover" />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <h3 className="truncate text-sm font-bold text-gray-900">{room.name}</h3>
                  <BookingButton status={room.status} />
                </div>
                <RoomMeta size={room.size} bed={room.bed} guests={room.guests} />
                <p className="my-2 line-clamp-2 text-sm leading-relaxed text-gray-500">{room.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Availability:{" "}
                    <span className="font-medium text-gray-500">
                      {room.available}/{room.total}
                    </span>
                  </span>
                  <span className="text-base leading-none font-bold text-gray-900">
                    ${room.price}
                    <span className="text-xs font-normal text-gray-400">/night</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={`flex flex-1 flex-col bg-gray-50 ${view === "list" ? "hidden lg:flex" : "flex"}`}>
        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("list")}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-200 lg:hidden"
            >
              <IconBack /> Back
            </button>
            <span className="text-xs font-semibold text-gray-400">Room Detail</span>
          </div>
          <button className="rounded-lg bg-[#e7f68f] px-4 py-1.5 text-xs font-bold text-gray-700 transition-colors hover:bg-[#d4e87a]">
            Edit
          </button>
        </div>

        <div className="flex-1 px-4 py-5 sm:px-6">
          <div className="mb-1 flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">{selected.name} Room</h2>
            <BookingButton status={selected.status} />
          </div>
          <p className="mb-5 text-xs text-gray-400">
            Occupied: {selected.available}/{selected.total} Rooms
          </p>

          <div className="mb-3 flex gap-3">
            <div className="hidden flex-col gap-2 sm:flex">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`overflow-hidden rounded-xl border-2 transition-all ${activeImage === img ? "border-[#9dc43b]" : "border-transparent"}`}
                >
                  <img src={img} alt="" className="h-16 w-16 object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl border border-gray-200">
              <img src={activeImage} alt={selected.name} className="h-52 w-full object-cover sm:h-64 md:h-72" />
            </div>
          </div>

          <div className="mb-5 flex gap-2 sm:hidden">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`overflow-hidden rounded-lg border-2 transition-all ${activeImage === img ? "border-[#9dc43b]" : "border-transparent"}`}
              >
                <img src={img} alt="" className="h-14 w-14 object-cover" />
              </button>
            ))}
          </div>

          <div className="mb-4">
            <RoomMeta size={selected.size} bed={selected.bed} guests={selected.guests} />
          </div>

          <p className="mb-6 text-sm leading-relaxed text-gray-600">{selected.description}</p>

          <section className="mb-6">
            <SectionHeading>Features</SectionHeading>
            <CheckList items={selected.features} />
          </section>

          <section className="mb-6">
            <SectionHeading>Facilities</SectionHeading>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {selected.facilities.map((f) => (
                <FacilityChip key={f} label={f} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeading>Amenities</SectionHeading>
            <CheckList items={selected.amenities} />
          </section>
        </div>
      </div>
    </div>
  );
}
