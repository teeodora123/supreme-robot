import Card from './Card'
import {formatMoney} from "../utils/format.js";

export default function SavingsGoal({goal, onChange, monthlySavings}) {
    const remaining = Math.max(goal.target - goal.alreadySaved, 0)
    const monthsNeeded = monthlySavings > 0 ? Math.ceil(remaining / monthlySavings) : null
    const progress = goal.target > 0 ? Math.min((goal.alreadySaved / goal.target)* 100, 100) : 0

    function handleChange(field, value) {
        onChange({...goal, [field]: Number(value)})
    }

    function getFinishDate(months) {
        const date = new Date()
        date.setMonth(date.getMonth() + months)
        return date.toLocaleDateString(undefined, {month: 'long', year: 'numeric'})
    }

    let message
    if(goal.target <= 0) {
        message = 'Set a goal to see your plan.'
    }else if(remaining === 0) {
        message = 'goal reached!'
    }else if(monthsNeeded === null) {
        message = 'Put an amount in savings category to see how long it will take'
    }else {
        message = `You still need ${formatMoney(remaining)}. Saving ${formatMoney(monthlySavings)}/month,\n` +
            ` you\'ll get there in ${monthsNeeded} month(s), around ${getFinishDate(monthsNeeded)}`
    }

    return (
        <Card title= "Saving goal">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-600">
                    Goal amount
                    <input
                        type="number"
                        min="0"
                        value={goal.target || ''}
                        onChange={(e) => handleChange('target', e.target.value)}
                        className= "rounded-lg border border-slate-300 px-3 py-2"/>
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-600">
                    Already saved
                    <input
                        type="number"
                        min="0"
                        value={goal.alreadySaved || ''}
                        onChange={(e) => handleChange('alreadySaved', e.target.value)}
                        className= "rounded-lg border border-slate-300 px-3 py-2"/>
                </label>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full bg-green-500 transition-all" style={{width: `${progress}%`}}/>
            </div>
            <p className="mt-1 text-right text-xs text-slate-500">{progress.toFixed(0)}%</p>

                <p className="mt-3 text-slate-700">{message}</p>
        </Card>
    )
}
