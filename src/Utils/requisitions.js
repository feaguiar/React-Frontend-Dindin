import api from '../services/api'

export async function loadCategories(setCategories) {
    try {
        const response = await api.get('/categoria')

        const orderedCateg = response.data.sort((a,b) => a-b)
        return orderedCateg;
    } catch (error) {
        console.log(error.response)
    }
}


export async function loadTransactions() {
    try {
        const response = await api.get('/transacao');     
        return response.data; 
    } catch (error) {
        console.log(error.response)
    }
}