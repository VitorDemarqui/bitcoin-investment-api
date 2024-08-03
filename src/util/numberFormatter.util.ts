import { Decimal } from "@prisma/client/runtime/library";

export const decimalFormatterBRL = (number: Decimal): string => {
    const formatNumber = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}) 
    return formatNumber.format(decimalToNumber(number));
}

export const numberFormatterBRL = (number: number): string => {
    const formatNumber = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}) 
    return formatNumber.format(number);
}

export const decimalToNumber = (decimal: Decimal): number => {
    return parseFloat(decimal.toFixed(2).toString())
}