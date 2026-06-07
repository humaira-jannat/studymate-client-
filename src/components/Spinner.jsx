const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;