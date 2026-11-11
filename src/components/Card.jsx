export default function Card({title, children}) {
    return (
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-700">{title}</h2>
            {children}
        </section>
    )
}
