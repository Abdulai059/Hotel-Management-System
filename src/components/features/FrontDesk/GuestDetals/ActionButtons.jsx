import { useNavigate } from "react-router-dom";

export default function ActionButtons({ booking }) {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate(`/dashboard/frontdesk/payment/${booking.id}`);
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="mt-4 w-full bg-gray-200 px-6 py-4">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handlePayment}
          className="rounded border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
        >
          Payment
        </button>

        <button
          onClick={handleClose}
          className="rounded bg-red-600 px-6 py-2 text-sm font-semibold text-white uppercase hover:bg-red-700"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}
