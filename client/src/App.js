import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import WeatherApp from './components/WeatherApp';
import NavBar from './components/NavBar';


const ROLES = {
    'User': 1,
    'Admin': 2
}

function App() {

    return (
        <>
        <NavBar />
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                {/* <Route path="linkpage" element={<LinkPage />} /> */}
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* we want to protect these routes */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                        <Route path="home" element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                        <Route path="weatherApp" element={<WeatherApp />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Route>

                {/* catch all */}
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
        </>
    );
}

export default App;