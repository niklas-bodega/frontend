const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <p className="text-red-400 text-sm uppercase tracking-widest text-center">
      {message}
    </p>
  );
};
export default ErrorMessage;
