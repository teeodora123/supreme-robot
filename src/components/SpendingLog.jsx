import {useState} from 'react'
import Card from './Card'
import {formatMoney} from '../utils/format'

export default function SpendingLog({entries, categories, onAdd, onDelete}) {
    const [description, setDescription] = useState('')
    const[amount, setAmount] = useState('')
    const[categoryId, setCategoryId] = useState(categories[0].id)

    function handleSubmit(e) {
        e.preventDefault()
        if(!description.trim() || Number(amount) <= 0) return

        onAdd({
            id: crypto.randomUUID(),
            description: description.trim(),
            amount: Number(amount),
            categoryId,
            date: new Date().toISOString(),
        })

        setDescription('')
        setAmount('')
    }
    const totalSpent = entries.reduce((sum, entry) => sum+ entry.amount,0)
    const getCategoryName = (id) => categories.find((c) => c.id === id) ?.name ?? 'Other'

    return (
        <Card title="What did I spend on?">
            <form onSubmit={handleSubmit} className="flex flexcol gap-2 sm:flex-row">
                <input
                    type = "text"
                    value = {description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder ="e.g Coffee with friends"
                    className = "flex-1 rpunded-lg border border-slate-300 px-3 py-2"
                />
                <input
                    input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="rounded-lg border border-slate-300 px-3 py-2 sm:w-28"
                />
                <select
                    value={categoryId}
                    onChange={(e)=> setCategoryId(e.target.value)}
                    className="rounded-lg border border-slate-300 px-3 py-2 sm:w-28"
                    >
                    {categories.map((c)=> (
                        <option key = {c.id} value = {c.id} > {c.name}</option>
                    ))}
                </select>
                <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
                    Add
                </button>
            </form>

            {entries.length === 0 ? (
                <p className="mt-4 text-sm text-slate-400"> No expenses yet.</p>
            ) : (
                <ul className="mt-4 divide-y divide-slate-100">
                    {entries.map((entry) => (
                        <li key={entry.id} className="flex items-center justify-between py-2">
                        <div>
                        <p className =" text-slate-800"> {entry.description}</p>
                            <p className="text-xs text-slate-400">
                                {getCategoryName(entry.categoryId)} . {new Date(entry.date).toLocaleDateString()}
                            </p>
                        </div>
                            <div className="flex items-center gap-3">
                                <span className="font-semibold">{formatMoney(entry.amount)}</span>
                                    <button
                                    onClick={()=> onDelete(entry.id)}
                                    className="text-slate-400 hover:text-red-600"
                                    aria-label="Delete">
                                        x
                                    </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <p className="mt-4 text-right font-sembold text-slate-700">
               Total spent: {formatMoney(totalSpent)}
            </p>
        </Card>
    )

}