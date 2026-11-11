import Card from './Card'

import {formatMoney} from "../utils/format.js";

function getRateColor(rate) {
    if (rate >= 20) return 'bg-green-100 text-green-700'
    if (rate >= 10) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
}

function Row({label, value, valueClass = 'text-slate-600'})
{
    return (
        <div className="flex justify-between">
            <span className="text-slate-500"> {label}</span>
            <span className={`font-semibold ${valueClass}`}>{value}</span>
        </div>
    )
}

export default function Summary({salary, categories, totalExpenses, surplus, savingsRate}) {
    const breakdown = categories.map((c) => ({
        ...c,
        percent: salary > 0 ? (c.amount / salary) * 100 : 0,
    }))

    return (
        <Card title="Overview">
            <div className="space-y-2">
                <Row label="Salary" value={formatMoney(salary)}/>
                <Row label="total planned" value={formatMoney(totalExpenses)}/>
                <Row
                    label="Remaining"
                    value={formatMoney(surplus)}
                    valueClass={surplus < 0 ? 'text-red-600' : 'text-green-600'}
                />
            </div>

            <div className='mt-4 rounded-lg p-3 text-center font-semibold ${getRateColor(savingRate)}'>
                Savings rate: {savingsRate.toFixed(1)}%
                {savingsRate < 20 && <p className="text-xs font-normal"> Aim for at least 20%</p>}
            </div>

            <h3 className="mt-6 mb-2 text-sm font-semibold text-slate-500"> Where your money goes</h3>

            <div className="flex h-4 overflow-hidden rounded-full bg-slate-200">
                {breakdown.map((c) => (
                    <div key={c.id} className={c.color} style={{width: '${c.percent}%'}}/>
                ))}
            </div>

            <ul className="mt-3 space-y-1 text-sm">
                {breakdown.map((c) => (
                    <li key={c.id} className="flex justify-between">
                        <span className="flex items-ceter gap-2">
                            <span className={`h-2 w-2 rounded-full ${c.color}`}/>
                            {c.name}
                            </span>
                        <span className="text-slate-500">{c.percent.toFixed(1)}%</span>
                    </li>
                ))}
            </ul>
        </Card>
    )
}