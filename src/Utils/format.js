import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatToDate(date) {
    const generateDate = new Date(date);

    return format(generateDate, 'dd/MM/yyyy')
}

export function formatToMoney(value) {

    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function wordWeek(word) {
    return word[0].toUpperCase() + word.slice(1, word.length)
}

export function formatToDay(date) {
    const generateDate = new Date(date);
    const week = format(generateDate, 'eee', {
        locale: ptBR
    });
    return wordWeek(week)
}