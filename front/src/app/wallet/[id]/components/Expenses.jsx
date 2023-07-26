import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import domain from "config";

export default function Expenses({wallet, setLoading, fetchData}) {
    const id = wallet._id
    const [expenseTitle, setExpenseTitle] = useState('')
    const [summ, setSumm] = useState(0)
    const [creditor, setCreditor] = useState()
    const [debtors, setDebtors] = useState([])


    const deleteExpense = async (expense_id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        };
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${id}/expense/${expense_id}`, requestOptions)
            const data = await response.json();
            await fetchData()

        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }

    }

    const addExpense = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: expenseTitle,
                    creditor_id: creditor,
                    debtors_id: debtors,
                    summ: summ
                }
            )
        };
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${id}/expense`, requestOptions)
            const data = await response.json();
            await fetchData()
            setCreditor('')
            setDebtors([])
            setSumm(0)
            setExpenseTitle('')
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleCheckboxChange = (event) => {
        const userId = event.target.value;
        if (event.target.checked) {
            setDebtors((prevDebtors) => [...prevDebtors, userId]);
        } else {
            setDebtors((prevDebtors) => prevDebtors.filter((id) => id !== userId));
        }
    };

    useEffect(() => {
        if (wallet.users) {
            setCreditor(wallet.users[0]?.id)
        } else {
            setCreditor("")
        }
    }, [wallet]);

    return (
        <div className="border rounded-xl border-cyan-500 p-2">
                         <span className="flex justify-between">
                            <h1>Расходы</h1>
                            <Icon icon="game-icons:expense"
                                  onClick={() => window.add_expense.showModal()}
                                  style={{fontSize: '20px', marginRight: '10px', cursor: "pointer"}}/>
                            <dialog id="add_expense" className="modal">
                                  <form method="dialog" className="modal-box">
                                    <button
                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                    <span
                                                        className="pb-2 flex justify-center items-center m-auto p-auto">Добавить расход</span>

                                      <div><input onChange={event => setExpenseTitle(event.target.value)}/></div>
                                      <span className="mr-2">Creditor</span>
                                    <select onChange={event => setCreditor(event.target.value)}>

                                        {wallet.users.map((user, index) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <option key={index} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                      {wallet.users.map((user) => (

                                          // eslint-disable-next-line react/jsx-key
                                          <div key={user.id}>
                                              <input
                                                  type="checkbox"
                                                  id={user.id}
                                                  name={user.name}
                                                  value={user.id}
                                                  onChange={handleCheckboxChange}
                                                  // checked={debtors.includes(user.id)}
                                              />
                                              <label htmlFor={user.id}>{user.name}</label>
                                          </div>
                                      ))}
                                      <input onChange={event => setSumm(event.target.value)}></input>
                                      <button className="btn"
                                              onClick={() => addExpense()}>
                                          ADD
                                      </button>

                                  </form>
                                </dialog>
                        </span>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>За что</th>
                        <th>Кредитор</th>
                        <th>Дебиторы</th>
                        <th>Сумма</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>
                    {wallet.expenses.map((expense, index) => (
                        <tr key={index}>
                            <td className="flex">
                                            <span>
                                                {expense.title}
                                            </span>
                            </td>
                            <td>{expense.creditor.name}</td>
                            <td>{expense.debtors.map((debtor) => (
                                `${debtor.name} `
                            ))}</td>
                            <td>
                                {expense.summ}
                            </td>
                            <td>
                                <span onClick={() => deleteExpense(expense.id)}>
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