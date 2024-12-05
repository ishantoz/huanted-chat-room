export default function MessageLoadingScreen() {
  return (
    <div className=" flex-1 overflow-hidden custom-style-scroll flex items-center justify-center font-protest tracking-wider">
      <div className="text-center text-neutral-400">
        <div className="animate-spin rounded-full h-7 w-7 sm:border-4 border-4 border-blue-400 border-t-transparent mx-auto mb-2"></div>
        <h2 className="text-lg font-bold">Haunted Messages Loading...</h2>
        <p className="text-sm mt-2">Summoning messages from the beyond...</p>
      </div>
    </div>
  );
}
