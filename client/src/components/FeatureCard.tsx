export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="card bg-base-100 shadow-xl border border-primary/20 transition-all duration-300 hover:shadow-primary/20">
    <div className="card-body items-center text-center">
      <div className="p-4 bg-primary/10 rounded-full">
        <Icon className="size-8 text-primary" />
      </div>
      <h3 className="card-title mt-4">{title}</h3>
      <p className="text-base-content/70">{description}</p>
    </div>
  </div>
);
