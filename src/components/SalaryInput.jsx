import Card from './Card'

export default function SalaryInput({salary, onChange}) {
    return (
        <Card title="Monthly net salary">
            <input
                type="number"
                min="0"
                value={salary || ''}
                onChange={(e) => onChange(Number(e.target.value))}
                placeholder="e.g. 5000"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-xl focus:border-blue-500 focus:outline-none"
            />
        </Card>
    )
}
