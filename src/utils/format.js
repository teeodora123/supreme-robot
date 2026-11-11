const CURRENCY = 'RON'

export function formatMoney(value){
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: CURRENCY,
    }).format(value)
}
