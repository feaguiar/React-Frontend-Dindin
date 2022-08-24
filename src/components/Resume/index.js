import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { formatToMoney } from '../../Utils/format'

function Resume({ transactions }) {
    const [extract, setExtract] = useState({
        in: 0,
        out: 0,
        total: 0
    })

    async function loadExtract() {
        try {
            const response = await api.get('/transacao/extrato')
            const { entrada, saida } = response.data;
            setExtract({
                in: formatToMoney(entrada),
                out: formatToMoney(saida),
                total: formatToMoney(entrada - saida)
            })

        } catch (error) {

        }
    }

    useEffect(() => {
        loadExtract()
    }, [transactions])

    return (
        <div className='container-resume'>
            <h1>Resumo</h1>

            <div className='line-resume'>
                <span>Entradas</span>
                <span className='in'>{extract.in}</span>
            </div>

            <div className='line-resume'>
                <span>Saídas</span>
                <span className='out'>{extract.out}</span>
            </div>

            <div className='horizontal-line'>

            </div>

            <div className='line-resume'>
                <h3>Saldo</h3>
                <span className='total'>{extract.total}</span>
            </div>
        </div>
    )
}

export default Resume;