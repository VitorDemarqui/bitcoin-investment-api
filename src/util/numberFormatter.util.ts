import { Decimal } from "@prisma/client/runtime/library";

export const numberFormatterBRL = (number: Decimal): string => {
    const formatNumber = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}) 
    return formatNumber.format(decimalToNumber(number));
}

export const decimalToNumber = (number: Decimal): number => {
    return parseFloat(number.toFixed(2).toString())
}