import { Outlet } from "react-router-dom";
import ThemeSwitch from './ThemeSwitch';
import Header from './Header';

const Layout = () => {
    return (
        <main className="App">
            <ThemeSwitch preserveRasters/>
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout