import { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../services/ApiService';
import { User } from '../../interfaces/User';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SandBox.css';

type Props = {};

const Sandbox = (props: Props) => {
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        getUsers().then((json) => {
            setUsers(json);
        });
    }, []);

    async function handleDelete(id: string) {
        if (window.confirm('Are you sure you want to delete?')) {
            await deleteUser(id);

            const updated = [...users].filter((user) => user._id !== id);
            setUsers(updated);
            toast.success('User successfully deleted.');
        }
    }

    return (
        <>
            <div className='container'>
                <Title mainText='Admin' />
                <table className='table table-hover text-center'>
                    <thead>
                        <tr>
                            <th className='userId'>User ID</th>
                            <th>Admin</th>
                            <th>Firstname</th>
                            <th>Email</th>
                            <th className='phone'>Phone number</th>
                            <th>Business</th>
                            {/* <th>Blocked</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td className='userId'>{user._id}</td>
                                <td>{JSON.stringify(user.isAdmin)}</td>
                                <td>{user.firstName}</td>
                                <td>{user.email}</td>
                                <td className='phone'>{user.phone}</td>
                                <td>{JSON.stringify(user.isBiz)}</td>
                                {/* <td>{user.blocked}</td> */}
                                <td>
                                    {!user.isAdmin && (
                                        <Link to={`/edituser/${user._id}`}>
                                            <button className='btn bt-light'>
                                                <i className='bi bi-pen' />
                                            </button>
                                        </Link>
                                    )}

                                    {!user.isAdmin && (
                                        <button
                                            onClick={() =>
                                                handleDelete(user._id as string)
                                            }
                                            className='btn bt-light'
                                        >
                                            <i className='bi bi-trash2' />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Sandbox;
