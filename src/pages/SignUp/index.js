import './styles.css';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const defaultForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ ...defaultForm })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        return
      }

      if (form.password !== form.confirmPassword) {
        return
      }

      await api.post('/usuario', {
        nome: form.name,
        email: form.email,
        senha: form.password
      })

      navigate('/')

    } catch (error) {
      console.log(error.response)
    }
  }

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value })
  }

  return (
    <div className='container-sign-up'>
      <img src={Logo} alt="logo" className='logo' />

      <div className='content-sign-up'>

        <form onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <div className='container-inputs'>
            <label className='container-label' htmlFor='name'>Nome</label>
            <input type='text' name='name' value={form.name} onChange={handleChangeForm} required />
          </div>

          <div className='container-inputs '>
            <label className='container-label' htmlFor='email'>E-mail</label>
            <input type='text' name='email' value={form.email} onChange={handleChangeForm} required />
          </div>

          <div className='container-inputs '>
            <label className='container-label' htmlFor='password'>Senha</label>
            <input type='password' name='password' value={form.password} onChange={handleChangeForm} required />
          </div>

          <div className='container-inputs '>
            <label className='container-label' htmlFor='confirm-password'>Confirmação de Senha</label>
            <input type='password' name='confirmPassword' value={form.confirmPassword} onChange={handleChangeForm} required />
          </div>
          <button className='btn-purple btn-big'>Cadastrar</button>
          <Link to="/">Já tem cadastro? Clique aqui!</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
