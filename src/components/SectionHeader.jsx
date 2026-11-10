export default function SectionHeader({ title, subtitle }) {
  return (
    <header className="mb-6">
      <h2 className="text-3xl font-black tracking-tight text-white">{title}</h2>
      {subtitle && <p className="mt-1 text-slate-400">{subtitle}</p>}
    </header>
  )
}
