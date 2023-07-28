import Datepicker from "react-tailwindcss-datepicker";
import React, {useCallback, useEffect, useState} from "react";
import domain from "config";
export default function AddNewExpenseButton({wallet, fetchData, setLoading}) {

    const [expenseSum, setExpenseSum] = useState(parseFloat("0"))
    const [freeMethod, setFreeMethod] = useState('equal')
    const [shareMethod, setShareMethod] = useState('percent')
    const [debtors, setDebtors] = useState([])
    const [shareIcon, setShareIcon] = useState('material-symbols:percent')
    const [eachShare, setEachShare] = useState(0)
    const [eachPercent, setEachPercent] = useState([]);
    const [valueError, setValueError] = useState('')

    const [expenseTitle, setExpenseTitle] = useState('')
    const [creditor, setCreditor] = useState()


    const addExpense = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    title: expenseTitle,
                    creditor_id: creditor,
                    debtors_id: debtors,
                    summ: expenseSum,
                    datetime: date.startDate,
                }
            )
        };
        console.log(requestOptions.body)
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${wallet._id}/expense`, requestOptions)
            const data = await response.json();
            await fetchData()
            setCreditor('')
            setDebtors([])
            setExpenseSum(0)
            setExpenseTitle('')
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };





    function roundNumber(number) {
        const decimalPlaces = number.toString().split('.')[1]?.length || 0;

        if (decimalPlaces > 2) {
            return `~ ${Number(number.toFixed(2))}`;
        }
        return number;
    }


    useEffect(() => {

        if (debtors.length > 0) {
            setEachShare(
                parseFloat(expenseSum / debtors?.length)
            )
        } else setEachShare(0)

        const initalPercent = wallet?.users.reduce((acc, user) => {
            if (shareMethod === 'percent') {
                acc[user.id] = 100 / (wallet.users).length;
                return acc;
            }
            if (shareMethod === 'sigma') {
                acc[user.id] = parseFloat(expenseSum / (wallet.users).length);
                return acc;
            }
            if (shareMethod === 'divider') {
                acc[user.id] = 1;
                return acc
            }
        }, {});
        setEachPercent(initalPercent)
    }, [expenseSum])


    const handleDateChange = (newValue) => {
        setDate(newValue);
    }

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });

    useEffect(() => {
        setDebtors(wallet?.users.map((user) => user.id))
        const initalPercent = wallet?.users.reduce((acc, user) => {
            acc[user.id] = 100 / (wallet.users).length;
            return acc;
        }, {});
        setEachPercent(initalPercent)
    }, [wallet]);

    const handleEachPercent = (event, userId,) => {

        const updatedEachPercent = {...eachPercent};
        updatedEachPercent[userId] = parseFloat(event.target.value).toFixed(2);
        setEachPercent(updatedEachPercent);
    };


    useEffect(() => {
        if (debtors?.length > 0) {
            setEachShare(
                parseFloat(expenseSum / debtors?.length)
            )
        } else setEachShare(0);
    }, [debtors]);

    const handleDebtors = useCallback((event) => {
        const userId = event.target.value;


        setDebtors((prevDebtors) => {
            if (event.target.checked) {
                return [...prevDebtors, userId];
            } else {
                return prevDebtors.filter((id) => id !== userId);
            }
        });
    }, []);

    useEffect(() => {
        if (wallet.users) {
            setCreditor(wallet.users[0]?.id)
        } else {
            setCreditor("")
        }
    }, [wallet]);


    return (
        <>
            <button className="btn" onClick={() => window.add_new_expense.showModal()}>Добавить новый расход</button>
            <dialog id="add_new_expense" className="modal">
                <form method="dialog" className="modal-box">
                    {/*TITLE*/}
                    <h3 className="font-bold text-lg pb-2">Добавление расхода</h3>
                    {/*NAME*/}
                    <label className="label">
                        <span className="label-text-alt">Название</span>
                    </label>
                    <input type="text" placeholder="билеты в кино, например"
                           onChange={event => setExpenseTitle(event.target.value)}
                           className="input input-bordered w-full max-w p-2"/>
                    {/*DATE*/}
                    <label className="label">
                        <span className="label-text-alt">Дата</span>
                    </label>
                    <Datepicker
                        inputClassName="input input-bordered w-full max-w"
                        startWeekOn="mon"
                        i18n={"ru"}
                        value={date}
                        onChange={handleDateChange}
                        asSingle={true}
                        popoverDirection="down"
                        useRange={false}
                        primaryColor={"fuchsia"}
                        showFooter={true}
                    />
                    {/*CREDITOR*/}
                    <label className="label">
                        <span className="label-text-alt">Кто платит?</span>
                    </label>
                    <select className="select select-bordered w-full max-w p-2">
                        <option disabled defaultValue>Кто платит?</option>
                        {wallet.users.map((user) => (
                            // eslint-disable-next-line react/jsx-key
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    {/*SUM*/}
                    <label className="label">
                        <span className="label-text-alt">Сумма</span>
                    </label>
                    <input type="number" placeholder="сумма"
                           onChange={event => setExpenseSum(parseFloat(event.target.value))}
                           className="input join-item input-bordered w-full max-w p-2 mb-2"/>


                    {/*<label className="label cursor-pointer p-2 justify-center text-xl">*/}
                    {/*    <span className={`label-text flex text-sm pr-2 text-xl ${freeMethod === "equal" ? "text-primary" : ""}`}>поровну</span>*/}
                    {/*    <input type="checkbox" id="method" onChange={handleSetFreeMethod}*/}
                    {/*           className="toggle toggle-lg"/>*/}
                    {/*    <span*/}
                    {/*        className={`label-text flex text-sm pl-2 text-xl ${freeMethod === "free" ? "text-primary" : ""}`}>произвольно</span>*/}
                    {/*</label>*/}


                    {freeMethod === "equal"
                        ?
                        <>
                            <div>между</div>
                            <div className="flex flex-wrap">
                                {wallet.users.map((user) => (
                                    // eslint-disable-next-line react/jsx-key,react/jsx-no-undef
                                    <React.Fragment key={user.id}>
                                        <label className={"label flex"}>
                                            <input type="checkbox"
                                                   key={user.id}
                                                   disabled={!expenseSum > 0}
                                                   className="toggle toggle mr-2"
                                                   defaultChecked={true}
                                                   name={user.name}
                                                   value={user.id}
                                                   onChange={handleDebtors}
                                            />
                                            <span className={`"flex"`}>{user.name}</span>
                                        </label>
                                    </React.Fragment>
                                ))}
                            </div>
                            {eachShare > 0 ? <div className="badge badge-lg p-5 mt-4">
                                {debtors.length > 1 ? "по " : ""}
                                {roundNumber(eachShare)}</div> : <></>}
                        </>
                        :
                        <>
                            {/*<div className="join flex mt-2 pb-10 gap-3">*/}
                            {/*    <input className="btn btn-outline" type="radio" name="options"*/}
                            {/*           onChange={() => handleShareMethod('percent')} defaultChecked={true}*/}
                            {/*           aria-label="%"/>*/}
                            {/*    <input className="btn btn-outline" type="radio" name="options"*/}
                            {/*           onChange={() => handleShareMethod('sigma')} aria-label="Σ"/>*/}
                            {/*    <input className="btn btn-outline" type="radio" name="options"*/}
                            {/*           onChange={() => handleShareMethod('divider')} aria-label="÷"/>*/}
                            {/*</div>*/}
                            {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">*/}

                            {/*    {wallet.users.map((user) => (*/}
                            {/*        // eslint-disable-next-line react/jsx-key*/}
                            {/*        <div className="relative" key={user.id}>*/}
                            {/*            <span className="label-text-alt">{user.name} {eachValue(user.id)}</span>*/}
                            {/*            <input type="number"*/}
                            {/*                   disabled={expenseSum <= 0}*/}
                            {/*                   onChange={event => handleEachPercent(event, user.id)}*/}
                            {/*                   value={parseFloat(Object?.entries(eachPercent).filter(([key, value]) => key === user.id)[0][1]).toFixed(2)}*/}
                            {/*                   className="px-4 py-2 border rounded-lg pl-10 input input-bordered w-full"/>*/}
                            {/*            <div*/}
                            {/*                className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-5">*/}
                            {/*                <Icon icon={shareIcon}*/}
                            {/*                      style={{fontSize: '20px', position: 'absolute'}}/>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    ))}*/}

                            {/*</div>*/}

                            {/*<div className="text-red-400">{valueError}</div>*/}


                            {/*/!*<div className="overflow-x-auto">*!/*/}
                            {/*/!*    <table className="table table-xs">*!/*/}
                            {/*/!*        <thead>*!/*/}
                            {/*/!*        <tr>*!/*/}
                            {/*/!*            <th></th>*!/*/}
                            {/*/!*        </tr>*!/*/}
                            {/*/!*        </thead>*!/*/}
                            {/*/!*        <tbody>*!/*/}
                            {/*/!*        <tr>*!/*/}
                            {/*/!*            <td>1</td>*!/*/}
                            {/*/!*        </tr>*!/*/}
                            {/*/!*        <tr>*!/*/}
                            {/*/!*            <td>1</td>*!/*/}
                            {/*/!*        </tr>*!/*/}
                            {/*/!*        <tr>*!/*/}
                            {/*/!*            <td>1</td>*!/*/}
                            {/*/!*        </tr>*!/*/}
                            {/*/!*        <tr>*!/*/}
                            {/*/!*            <td>1</td>*!/*/}
                            {/*/!*        </tr>*!/*/}
                            {/*/!*        </tbody>*!/*/}
                            {/*/!*    </table>*!/*/}
                            {/*/!*</div>*!/*/}


                        </>
                    }


                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary"
                                disabled={expenseSum <= 0 || debtors <= 0}
                                onClick={addExpense}
                        >Добавить
                        </button>
                        <button className="btn">Отмена</button>

                    </div>


                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}