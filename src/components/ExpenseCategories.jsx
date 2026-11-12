import Card from './Card'

export default function ExpenseCategories({categories, onChange}) {
    return (
        <Card title="Monthly budget">
            <div className="space-y-3">
                {categories.map((category)=> (
                    <label key={category.id} className="flex-items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-s;ate-600">
                            <span className={`h-3 w-3 rounded full ${category.color}`}/>
                            {category.name}
                        </span>
                        <input
                            type="number"
                            min="0"
                            value={category.amount || ''}
                            onChange={(e)=> (category.id, number(e.target.value))}
                            placeholder="0"
                            className="w-32 rounded-lg border border-slate-500 px-3 py-1 text-right focus:border-blue-500 focus:outline-none"
                        />
                    </label>
                ))}
            </div>
        </Card>
    )
}