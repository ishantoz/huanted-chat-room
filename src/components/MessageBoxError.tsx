export default function MessageBoxError() {
  return (
    <div className="flex-1 overflow-hidden custom-style-scroll flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-red-500 text-2xl font-bold mb-4">
        👻 Lost in the Shadows 👻
      </h1>
      <p className="text-gray-400 text-lg">
        The spirits seem to have disconnected {`):`}
      </p>
      <p className="text-gray-400 mt-2">
        Please refresh the page to reconnect to the haunted chat room.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
      >
        Refresh Page
      </button>
    </div>
  );
}
