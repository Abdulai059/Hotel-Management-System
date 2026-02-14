import { Workbox } from "workbox-window";
import { useEffect, useState } from "react";
import { RotateCw } from "lucide-react";

export default function NavbarRefresh() {
  const [wb, setWb] = useState(null);
  const [newVersion, setNewVersion] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js");
      wb.addEventListener("waiting", () => setNewVersion(true));
      wb.register();
      setWb(wb);
    }
  }, []);

  const handleRefresh = () => {
    if (wb) wb.messageSkipWaiting();
    window.location.reload();
  };

  return (
    <button
      onClick={handleRefresh}
      title="Refresh App"
      className="flex items-center justify-center rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300"
    >
      <RotateCw size={20} />
    </button>
  );
}
