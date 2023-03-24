import { useEffect } from "react";

export default function Success({ message }) {
  let responseMessage = message;
  useEffect(() => {
    setTimeout(() => {
      responseMessage = "";
    }, 5000);
  }, [message]);
  return (
    <div className="flex items-center">
      <div className="relative bg-green-200 max-w-xl px-4 py-2 text-green-800 rounded shadow w-full">
        <span className="block text-sm">{responseMessage}</span>
      </div>
    </div>
  );
}
