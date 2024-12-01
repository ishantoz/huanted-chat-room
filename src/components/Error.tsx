export default function Error() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-red-500 text-center">
        <h2 className="text-2xl font-bold">👻 Oops! Something went wrong</h2>
        <p className="mt-2">The spirits are having technical difficulties...</p>
        <p className="text-sm mt-1">Please try refreshing the page</p>
      </div>
    </div>
  );
}
