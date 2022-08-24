import './style.css';
import Close from '../../assets/close.svg';
import '../../styles/buttons.css'
import api from '../../services/api'
import { useState, useEffect } from 'react'
import { setItem } from '../../Utils/storage'

const defaultForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function ProfileModal({ open, handleClose }) {
    const [form, setForm] = useState({ ...defaultForm })

    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!form.name || !form.email || !form.password || !form.confirmPassword) {
                return
            }
            if (form.password !== form.confirmPassword) {
                return
            }
            await api.put('/usuario', {
                nome: form.name,
                email: form.email,
                senha: form.password
            })
            setItem('userName', form.name)
            handleClose()
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        async function loadProfile() {
            try {
                const response = await api.get('/usuario')

                const { nome, email } = response.data;
                setForm({ ...form, name: nome, email: email })

            } catch (error) {
                console.log(error)
            }
        }
        if (open) {
            loadProfile()
        }
    }, [open])
    return (
        <>
            {open &&
                <div className='backdrop'>
                    <div className='modal'>
                        <img src={Close} alt='close-button' className='close-button' onClick={handleClose} />
                        <h2>Editar Perfil</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='container-inputs'>
                                <label>Nome</label>
                                <input type='text' name='name' value={form.name} onChange={handleChangeForm} required />
                            </div>
                            <div className='container-inputs'>
                                <label>E-mail</label>
                                <input type='text' name='email' value={form.email} onChange={handleChangeForm} required />
                            </div>
                            <div className='container-inputs'>
                                <label>Senha</label>
                                <input type='password' name='password' value={form.password} onChange={handleChangeForm} required />
                            </div>
                            <div className='container-inputs'>
                                <label>Confirmação de Senha</label>
                                <input type='password' name='confirmPassword' value={form.confirmPassword} onChange={handleChangeForm} required />
                            </div>
                            <button className='btn-small btn-purple'>Confirmar</button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileModal;