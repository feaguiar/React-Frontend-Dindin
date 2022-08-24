import './style.css';
import Header from '../../components/Header';
import Table from '../../components/Table';
import Resume from '../../components/Resume';
import ProfileModal from '../../components/ProfileModal';
import { useEffect, useState } from 'react';
import AddTransactionModal from '../../components/AddTransactionModal';
import Filter from '../../components/Filter';
import { loadTransactions } from '../../Utils/requisitions';
import EditTransactionModal from '../../components/EditTransactionModal';

function Main() {
    const [openModalProfile, setOpenModalProfile] = useState(false)
    const [openModalAddTransaction, setOpenModalAddTransaction] = useState(false)
    const [transactions, setTransactions] = useState([]);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [currentItemEdit, setCurrentItemEdit] = useState(null)


    useEffect(() => {
        async function getAllTransaction() {
            const allTransaction = await loadTransactions();
            setTransactions([...allTransaction])
        }
        getAllTransaction()
    }, [])

    return (
        <div className='container-main'>
            <Header
                handleEditProfile={() => setOpenModalProfile(true)} />

            <section>
                <div className='width-limit'>
                    <div className='container-data'>
                        <div className='container-left'>
                            <Filter />
                            <Table
                                transactions={transactions}
                                setTransactions={setTransactions}
                                setOpenModalEdit={setOpenModalEdit}
                                setCurrentItemEdit={setCurrentItemEdit}
                            />
                        </div>
                        <div className='container-right'>
                            <Resume transactions={transactions} />
                            <button className='btn-purple btn-small' onClick={() => setOpenModalAddTransaction(true)}>Adicionar Registro</button>
                        </div>
                    </div>
                </div>
            </section>
            <AddTransactionModal
                open={openModalAddTransaction}
                handleClose={() => setOpenModalAddTransaction(false)}
                setTransactions={setTransactions}
            />

            <EditTransactionModal
                open={openModalEdit}
                handleClose={() => setOpenModalEdit(false)}
                setTransactions={setTransactions}
                currentItemEdit={currentItemEdit}
            />
            <ProfileModal
                open={openModalProfile}
                handleClose={() => setOpenModalProfile(false)} />
        </div>
    )

}

export default Main;