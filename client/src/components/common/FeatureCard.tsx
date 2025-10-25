export const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="card bg-base-100/80 backdrop-blur-md shadow-lg border border-emerald-300/30 hover:shadow-emerald-400/40 hover:-translate-y-1 transition-all duration-300">
    <div className="card-body items-center text-center">
      <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full shadow-inner">
        <Icon className="size-8 text-emerald-600" />
      </div>
      <h3 className="card-title mt-4 text-emerald-700">{title}</h3>
      <p className="text-base-content/70">{description}</p>
    </div>
  </div>
);
