export default function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center font-protest tracking-wider ">
      <div className="text-neutral-400 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-400 border-t-transparent mx-auto mb-10"></div>
        <h2 className="text-xl font-bold">Connecting to the spirit realm...</h2>
        <p className="text-sm mt-2">
          Please wait while we establish contact...
        </p>
      </div>
    </div>
  );
}
