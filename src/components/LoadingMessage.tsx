const LoadingMessage = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <p className="text-stone-400 text-sm uppercase tracking-widest">
        {message}
      </p>
    </div>
  );
};

export default LoadingMessage;
