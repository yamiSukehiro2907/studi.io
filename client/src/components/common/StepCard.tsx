export const StepCard = ({
                             number,
                             title,
                             description,
                         }: {
    number: string;
    title: string;
    description: string;
}) => (
    <div
        className="flex flex-col items-center text-center md:items-start md:text-left bg-base-100/70 rounded-2xl p-6 shadow-md border border-emerald-300/30 hover:shadow-emerald-400/30 hover:scale-[1.02] transition-all duration-300">
        <div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-xl shadow-md">
            {number}
        </div>
        <h3 className="text-xl font-bold mt-4 mb-2 text-emerald-700">{title}</h3>
        <p className="text-base-content/70">{description}</p>
    </div>
);
