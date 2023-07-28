import {Icon} from "@iconify/react";
import React, {useEffect, useState} from "react";
import domain from "config";
import Users from "@/app/wallet/[id]/components/Users";

export default function UsersWithAvatars({wallet, fetchData, setLoading}) {
    const id = wallet._id
    const [newUserName, setNewUserName] = useState('')
    const [usersPictures, setUsersPictures] = useState('')
    const [editUser, setEditUser] = useState()


    useEffect(() => {
        console.log(editUser);
    }, [editUser]);


    const editUserFunc = (user) => {

        setEditUser(user)
        window.edit_user.showModal()
    }

    const editUserRequest = async (user) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
        };

        try {
            console.log(editUser)
            const response = await fetch(`http://${domain}/api/v1/event/${id}/user/${editUser?.id}/${editUser?.name}/`, requestOptions)
            const data = await response.json();
            await fetchData()
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }


    const addUser = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: `${newUserName}`})
        };
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${id}/user`, requestOptions)
            const data = await response.json();
            await fetchData()
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const walletUsersLineClass = () => {
        if ((wallet.users).length <= 7) {
            return "-space-x-2"
        } else if ((wallet.users).length <= 8) {
            return "-space-x-3"
        } else if ((wallet.users).length <= 9) {
            return "-space-x-3"
        } else if ((wallet.users).length <= 10) {
            return "-space-x-4"
        } else if ((wallet.users).length <= 11) {
            return "-space-x-4"
        } else return "-space-x-6"
    }
    useEffect(() => {
        setUsersPictures(walletUsersLineClass())
    }, [wallet.users]);


    const deleteUser = async (user_id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${id}/user/${user_id}`, requestOptions)
            const data = await response.json();
            await fetchData()

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }

    }


    return (
        <>
            <div className="flex w-full justify-between">
                <div className={`flex ${usersPictures}`}>
                    {wallet.users.map((user, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="tooltip tooltip-bottom" data-tip={`${user.name}`} key={user.id}>
                            <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.name}`}
                                 className="w-12 h-12 rounded-full " alt={''}/>
                        </div>
                    ))}


                </div>
                <div className="flex gap-1">
                    <div>
                        <div
                            className="flex items-center justify-center  w-12 h-12 rounded-full border-dashed border bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-400">
                            <div className="tooltip tooltip-left" data-tip="Изменить пользователей">
                                <Icon icon="la:users" style={{fontSize: '25px'}}
                                      onClick={() => window.manage_users.showModal()}/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex items-center justify-center  w-12 h-12 rounded-full border-dashed border bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-400">
                        <div className="tooltip tooltip-left" data-tip="Добавить пользователя">
                            <Icon icon="material-symbols:add" style={{fontSize: '25px'}}
                                  onClick={() => window.add_new_user.showModal()}/>
                        </div>
                    </div>
                </div>
            </div>


            <dialog id="add_new_user" className="modal modal-top mt-14">
                <form method="dialog" className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>
                    <span
                        className="pb-2 flex justify-center items-center m-auto p-auto">Имя пользователя</span>

                    <input onChange={event => setNewUserName(event.target.value)}
                           type="text" placeholder=""
                           className="input mt-4 input-bordered input-primary w-full max-w"/>
                    <button className="mt-2 btn flex justify-center items-center m-auto p-auto"
                            onClick={() => addUser()}>Добавить
                    </button>
                </form>
            </dialog>

            <dialog id="manage_users" className="modal">
                <form method="dialog" className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>

                    {(wallet.users).length >= 1 ?
                        (<div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                </thead>
                                <tbody>
                                {wallet.users.map((user) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <tr key={user.id}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img
                                                            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${user.name}`}
                                                            alt="Avatar Tailwind CSS Component"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className="flex items-center justify-center  w-8 h-8 rounded-full border-dashed border bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-400">
                                                <div className="tooltip tooltip-left" data-tip="Удалить пользователя">
                                                    <Icon icon="material-symbols:remove"
                                                          style={{fontSize: '20px', color: "red"}}
                                                          onClick={() => deleteUser(user.id)}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                className="flex items-center justify-center  w-8 h-8 rounded-full border-dashed border bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-400">
                                                <div className="tooltip tooltip-left" data-tip="Изменить пользователя">
                                                    <Icon icon="material-symbols:edit"
                                                          style={{fontSize: '15px'}}
                                                          onClick={() => editUserFunc(user)}/>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>)
                        :
                        (
                            <>
                                <div className="mt-4 text-center">
                                    Чтобы кому-то что-то занять, нужно это что-то иметь.
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="btn"
                                        onClick={() => window.add_new_user.showModal()}
                                    >Добавить первого пользователя
                                    </button>
                                </div>
                            </>

                        )
                    }


                </form>
            </dialog>


            <dialog id="edit_user" className="modal modal-top mt-14">
                <form method="dialog" className="modal-box">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕
                    </button>
                    <span
                        className="pb-2 flex justify-center items-center m-auto p-auto">Имя пользователя</span>

                    <input
                          onChange={event => setEditUser({ ...editUser, name: event.target.value })}
                        type="text" placeholder=""
                        defaultValue={editUser?.name}
                        className="input mt-4 input-bordered input-primary w-full max-w"/>
                    <button className="mt-2 btn flex justify-center items-center m-auto p-auto"
                            onClick={() => editUserRequest(editUser)}>Изменить
                    </button>
                </form>
            </dialog>


        </>
    )
}