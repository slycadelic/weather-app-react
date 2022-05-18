import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        // define function to get list of users
        const getUsers = async () => {

            const response = await axiosPrivate.get('/users', {
                signal: controller.signal
            });
            isMounted && setUsers(response.data);
            // try {
            //     const response = await axiosPrivate.get('/users', {
            //         signal: controller.signal
            //     });
            //     console.log(response.data);
            //     isMounted && setUsers(response.data);
            // } catch (err) {
            //     console.error(err);
            //     navigate('/login', { state: { from: location }, replace: true });
            // }
        }

        // call the function
        getUsers();

        // clean-up function runs as the component unmounts and cancel 
        // any pending requests using the abort controller defined above
        return () => {
            isMounted = false;
            controller.abort();
        }
        // eslint-disable-next-line
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul className='userList'>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    );
};

export default Users;