export default function UIHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="text-white/70 mt-2">{subtitle}</p>}
    </div>
  );
} 