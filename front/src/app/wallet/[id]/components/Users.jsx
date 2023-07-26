import {Icon} from "@iconify/react";
import {useState} from "react";
import domain from "config";

export default function Users({wallet, setLoading, fetchData}) {
    const id = wallet._id
    const [newUserName, setNewUserName] = useState('')
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

    return (

        <div className="border rounded-xl border-cyan-500 p-2">
                        <span className="flex justify-between">
                            <h1>Пользователи</h1>
                            <Icon icon="ic:baseline-group-add"
                                  onClick={() => window.add_user.showModal()}
                                  style={{fontSize: '20px', marginRight: '10px', cursor: "pointer"}}/>
                            <dialog id="add_user" className="modal">
                                  <form method="dialog" className="modal-box">
                                    <button
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
                        </span>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th colSpan={2}>Имя</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wallet.users.map((user, index) => (
                        <tr key={index}>
                            <td className="flex justify-between">
                                            <span>
                                                {user.name}
                                            </span>
                                <span onClick={() => deleteUser(user.id)}>
                                                <Icon icon="material-symbols:delete-outline"
                                                      style={{
                                                          fontSize: '20px',
                                                          marginRight: '10px',
                                                          cursor: "pointer",
                                                          color: "red"
                                                      }}
                                                />
                                            </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}