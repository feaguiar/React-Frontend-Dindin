import { Outlet, Navigate, Route, Routes} from 'react-router-dom'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import { getItem } from './Utils/storage';

function ProtectedRoutes({redirectTo}) {
    const token = getItem('token');

    return token ? <Outlet /> : <Navigate to={redirectTo} />;
} 

function MainRoutes() {
    return (
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo='/' />}>
            <Route path='/main' element={<Main />} />
            </Route>
        </Routes>
    )
    
}

export default MainRoutes;