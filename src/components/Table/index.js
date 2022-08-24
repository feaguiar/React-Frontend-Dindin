import './style.css'
import Edit from '../../assets/edit.svg'
import Delete from '../../assets/delete.svg'
import OrderUp from '../../assets/orderUp.svg'
import OrderDown from '../../assets/orderDown.svg'
import { useState } from 'react'
import ConfirmModal from '../ConfirmModal'
import { formatToDate, formatToMoney, formatToDay } from '../../Utils/format'
import api from '../../services/api'
import { loadTransactions } from '../../Utils/requisitions'


function Table({ transactions, setTransactions, setOpenModalEdit, setCurrentItemEdit }) {

    const [order, setOrder] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)

    async function handleDeleteItem() {
        try {
            await api.delete(`/transacao/${currentItem.id}`)

            const allTransaction = await loadTransactions();
            setTransactions([...allTransaction]);
        } catch (error) {
            console.log(error.response)
        }
        finally {
            setOpenConfirm(false)
        }
    }

    function handleOpenConfirm(transact) {
        setCurrentItem(transact)
        setOpenConfirm(!openConfirm)
    }

    function handleOpenEdit(transact) {
        setOpenModalEdit(true)
        setCurrentItemEdit(transact)
    }
    return (
        <div className='container-table'>
            <div className='table-head'>
                <div className='table-colum-small content-date' onClick={() => setOrder(!order)}>
                    <strong>Data</strong>
                    <img src={order ? OrderUp : OrderDown} alt='order ' />
                </div>
                <strong className='table-colum-middle'>Dia da Semana</strong>
                <strong className='table-colum-big'>Descrição</strong>
                <strong className='table-colum-small'>Categoria</strong>
                <strong className='table-colum-small'>Valor</strong>
                <strong className='table-colum-small'></strong>
            </div>

            <div className='table-body'>
                {transactions.map((transact) => (
                    <div className='table-row' key={transact.id}>
                        <strong className='table-colum-small content-date'>{formatToDate(transact.data)}</strong>
                        <span className='table-colum-middle'>{formatToDay(transact.data)}</span>
                        <span className='table-colum-big'>{transact.descricao}</span>
                        <span className='table-colum-small'>{transact.categoria_nome}</span>
                        <strong className={`table-colum-small ${transact.tipo === 'entrada' ? 'positive-value' : 'negative-value'}`}>{formatToMoney(transact.valor)}</strong>
                        <div className='table-colum-small action-buttons'>
                            <img src={Edit} alt='edit' onClick={() => handleOpenEdit(transact)}
                            />
                            <img src={Delete} alt='delete' onClick={() => handleOpenConfirm(transact)} />
                        </div>
                        <ConfirmModal
                            open={openConfirm && transact.id === currentItem.id}
                            handleClose={() => setOpenConfirm(false)}
                            handleConfirm={handleDeleteItem} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Table;