export default function usePrice({ amount, currencyCode, locale }) {
    const formatCurrency = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    })

    return formatCurrency.format(amount)
}
