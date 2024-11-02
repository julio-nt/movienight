type Props = {
  message: string;
  className?: string;
};

const ErrorMessage = ({ message, className }: Props) => {
  return <p className={`text-red-500 ${className}`}>{message}</p>;
};

export default ErrorMessage;
