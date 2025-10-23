export const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center md:items-start md:text-left">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-content font-bold text-xl">
      {number}
    </div>
    <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
    <p className="text-base-content/70">{description}</p>
  </div>
);
