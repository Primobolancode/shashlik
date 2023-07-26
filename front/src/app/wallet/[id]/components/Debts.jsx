import {Icon} from "@iconify/react";

export default function Debts({wallet, setLoading, fetchData}) {
    const id = wallet._id

    const repaidDebt = async (debt_id) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(`http://api.localhost/api/v1/event/${id}/debt/${debt_id}/repaid`, requestOptions)
            const data = await response.json();
            await fetchData()

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };
    const unrepaidDebt = async (debt_id) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(`http://api.localhost/api/v1/event/${id}/debt/${debt_id}/unrepaid`, requestOptions)
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
                            <h1>Долги</h1>
                        </span>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Погашен</th>
                        <th>Кредитор</th>
                        <th>Дебиторы</th>
                        <th>Сумма</th>
                        <th>Погасить/Отменить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wallet.debts.map((debt, index) => (
                        <tr key={index}>
                            <td className="flex">
                                            <span>
                                                {debt.repaid ?
                                                    <div>
                                                        +
                                                    </div>
                                                    :
                                                    <div>
                                                        -
                                                    </div>
                                                }

                                            </span>
                            </td>
                            <td>{debt.creditor.name}</td>
                            <td>{debt.debtor.name}</td>
                            <td>
                                {debt.summ}
                            </td>
                            <td>
                                {debt.repaid
                                    ?
                                    <span onClick={() => unrepaidDebt(debt.id)}>
                                      <Icon icon="material-symbols:paid"
                                            style={{
                                                fontSize: '20px',
                                                marginRight: '10px',
                                                cursor: "pointer",
                                                color: "red"
                                            }}
                                      />
                                </span>
                                    :

                                    <span onClick={() => repaidDebt(debt.id)}>
                                      <Icon icon="material-symbols:paid"
                                            style={{
                                                fontSize: '20px',
                                                marginRight: '10px',
                                                cursor: "pointer",
                                                color: "red"
                                            }}
                                      />
                                </span>


                                }

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
