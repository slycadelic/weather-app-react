import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, resetUser, userAttribs] = useInput('user', '');//useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(user, pwd);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setPwd('');
            resetUser();
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit} className='loginForm'>
                <label htmlFor="username">Username:</label>
                <input
                    className='loginInput'
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    {...userAttribs}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    className='loginInput'
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button className="signInButton">Sign In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor="persist">Trust this Device</label>
                </div>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    )
}

export default Login