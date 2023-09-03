

export const Loading = () => {
  return (
    <div className="fixed z-50 top-0 left-0 h-screen w-screen flex justify-center items-center backdrop-filter backdrop-blur-md">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
