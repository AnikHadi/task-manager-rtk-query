export default function Error({ message }) {
  let responseMessage = message;
  setTimeout(() => {
    responseMessage = "";
  }, 5000);
  return (
    <div className="flex items-center">
      <div className="relative bg-red-200 max-w-xl px-4 py-2 text-red-800 rounded shadow w-full">
        <span className="block text-sm">{responseMessage}</span>
      </div>
    </div>
  );
}
