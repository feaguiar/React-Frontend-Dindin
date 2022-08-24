import './style.css'
import Logo from '../../assets/logo.svg';
import Logout from '../../assets/logout.svg';
import Profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import { clear, getItem } from '../../Utils/storage';
import { useEffect, useState } from 'react';

function Header({ handleEditProfile }) {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const userName = getItem('userName')

    // useEffect(() => {
    //     setUsuario(user)
    // }, []);

    function handleLogout() {
        navigate('/');
        clear();
    }
    return (
        <header>
            <img src={Logo} alt='logo' />
            <div className='container-sign-out'>
                <div className='profile-area' onClick={handleEditProfile}>
                    <img src={Profile} alt='profile' />
                    <strong>{userName}</strong>
                </div>
                <img src={Logout} alt='logout' className='sign-out' onClick={handleLogout} />
            </div>
        </header>
    )
}

export default Header;