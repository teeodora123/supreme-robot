import {useState, useEffect} from 'react'
import SalaryInput from "./components/SalaryInput.jsx";
import ExpenseCategories from "./components/ExpenseCategories.jsx";
import Summary from "./components/Summary.jsx";
import SavingsGoal from "./components/SavingsGoal.jsx";
import SpendingLog from "./components/SpendingLog.jsx";

const DEFAULT_CATEGORIES = [
    {id: 'housing', name: 'Housing', amount: 0, color: 'bg-blue-500'},
    {id: 'groceries', name: 'Groceries', amount: 0, color: 'bg-orange-500'},
    {id: 'dining', name: 'Dining', amount: 0, color: 'bg-pink-500'},
    {id: 'transporting', name: 'Transporting', amount: 0,  color:'bg-purple-500'},
    {id: 'savings', name: 'Savings', amount: 0, color: 'bg-green-500'},
]

function loadFromStorage(key, fallback) {
    try{
        const saved = localStorage.getItem(key)
        return saved ? JSON.parse(saved):fallback
    }catch{
        return fallback
    }
}

export default function App() {
    const [salary, setSalary] = useState(() => loadFromStorage('salary', 0))
    const [categories, setCategories] = useState(() => loadFromStorage('categories', DEFAULT_CATEGORIES))
    const [goal, setGoal] = useState(() => loadFromStorage('goal', {target: 0, alreadySaved: 0}))
    const [entries, setEntries] = useState(() => loadFromStorage('entries', []))

    useEffect(() => {
        localStorage.setItem('salary', JSON.stringify(salary))
        localStorage.setItem('categories', JSON.stringify(categories))
        localStorage.setItem('goal', JSON.stringify(goal))
        localStorage.setItem('entries', JSON.stringify(entries))
    }, [salary, categories, goal, entries])

    const totalExpenses = categories.reduce((sum, c) => sum + c.amount, 0)
    const surplus = salary - totalExpenses
    const monthlySavings = categories.find((c) => c.id === 'savings')?.amount ?? 0
    const savingsRate = salary > 0 ? (monthlySavings / salary) * 100 : 0

    function updateCategory(id, newAmount) {
        setCategories((prev) =>
            prev.map((c) => (c.id === id ? {...c, amount: newAmount} : c))
        )
    }

    function addEntry(entry) {
        setEntries((prev) => [entry, ...prev])
    }

    function deleteEntry(id) {
        setEntries((prev) => prev.filter((e) => e.id !== id))
    }

    return (
        <div className="min-h-screen bg-slate-100 p-4 md:p-8">
            <div className="mx-auto max-w-4xl space-y-6">
                <h1 className="text-3xl font-bold text-slate-800"> Money Tracker</h1>

                <SalaryInput salary={salary} onChange={setSalary}/>

                <div className="grid gap-6 md:grid-cols-2">
                    <ExpenseCategories categories={categories} onChange={updateCategory}/>
                    <Summary
                        salary={salary}
                        categories={categories}
                        totalExpenses={totalExpenses}
                        surplus={surplus}
                        savingsRate={savingsRate}
                    />
                </div>
                <SavingsGoal goal={goal} onChange={setGoal} monthlySavings={monthlySavings}/>

                <SpendingLog
                    entries={entries}
                    categories={categories}
                    onAdd={addEntry}
                    onDelete={deleteEntry}
                />
            </div>
        </div>
    )
}
