type Props = {
  title: string;
  className?: string;
};

const Title = ({ title, className }: Props) => {
  return <h1 className={`text-white text-4xl ${className}`}>{title}</h1>;
};

export default Title;
