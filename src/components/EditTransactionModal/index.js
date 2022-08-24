import './style.css';
import Close from '../../assets/close.svg';
import '../../styles/buttons.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { loadCategories, loadTransactions } from '../../Utils/requisitions';
import { formatToDate } from '../../Utils/format'

const clearForm = {
    value: '',
    category: {
        id: '',
        name: ''
    },
    date: '',
    description: ''
}

function EditTransactionModal({ open, handleClose, setTransactions, currentItemEdit }) {
    const [option, setOption] = useState('out')
    const [categories, setCategories] = useState([])
    const [form, setForm] = useState({ ...clearForm })

    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value })
    }

    function handleChangeSelect({ target }) {
        const currentCategory = categories.find((categ) => categ.descricao === target.value)

        if (!currentCategory) {
            return
        }
        setForm({ ...form, category: { id: currentCategory.id, name: currentCategory.descricao } })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const [day, month, year] = form.date.split('/')

        try {
            await api.put(`/transacao/${currentItemEdit.id}`,
                {
                    tipo: option === 'in' ? "entrada" : "saida",
                    descricao: form.description,
                    valor: form.value,
                    data: new Date(`${year}-${month}-${day}`),
                    categoria_id: form.category.id
                });
            handleClose()
            setForm({ ...clearForm });

            const allTransaction = await loadTransactions();
            setTransactions([...allTransaction]);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getCategories() {
            const allcateg = await loadCategories();

            setCategories([...allcateg]);
        }
        getCategories();
    }, [])

    useEffect(() => {
        if (currentItemEdit) {
            const { categoria_id, categoria_nome, data, descricao, tipo, valor } = currentItemEdit

            setForm({
                value: valor,
                category: {
                    id: categoria_id,
                    name: categoria_nome
                },
                date: formatToDate(data),
                description: descricao
            });
            setOption(tipo === 'entrada' ? 'in' : 'out')
        }
    }, [currentItemEdit])

    return (
        <>
            {open &&
                <div className='backdrop'>
                    <div className='modal'>
                        <img src={Close} alt='close-button' className='close-button' onClick={handleClose} />
                        <h2>Editar Registro</h2>
                        <div className='container-options'>
                            <button className={`${option === 'out' ? 'btn-gray' : 'btn-blue'} btn-small`} onClick={() => setOption('in')}>Entrada</button>
                            <button className={`${option === 'out' ? 'btn-red' : 'btn-gray'} btn-small`} onClick={() => setOption('out')}>Saída</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='container-inputs'>
                                <label>Valor</label>
                                <input type='number' name='value' value={form.value} onChange={handleChangeForm} required />
                            </div>

                            <div className='container-inputs'>
                                <label>Categoria</label>
                                <select name='category' value={form.category.descricao} onChange={handleChangeSelect} required>
                                    <option>Selecione</option>
                                    {categories.map((categ) => (
                                        <option key={categ.id} value={categ.descricao}>{categ.descricao}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='container-inputs'>
                                <label>Data</label>
                                <input type='text' name='date' value={form.date} onChange={handleChangeForm} required />
                            </div>
                            <div className='container-inputs'>
                                <label>Descrição</label>
                                <input type='text' name='description' value={form.description} onChange={handleChangeForm} required />
                            </div>
                            <button className='btn-small btn-purple'>Confirmar</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default EditTransactionModal;