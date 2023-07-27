'use client'
import React, {useCallback, useEffect, useState} from "react";
import {Icon} from '@iconify/react';
import Header from "@/app/wallet/[id]/components/Header";
import Users from "@/app/wallet/[id]/components/Users";
import Expenses from "@/app/wallet/[id]/components/Expenses";
import Debts from "@/app/wallet/[id]/components/Debts";

import domain from "config";
import Datepicker from "react-tailwindcss-datepicker";

export default function Wallet({params}) {
    const {id} = params;
    const [wallet, setWallet] = useState();
    const [loading, setLoading] = useState(true);


    const [freeMethod, setFreeMethod] = useState('equal')
    const [shareMethod, setShareMethod] = useState('percent')
    const [shareIcon, setShareIcon] = useState('material-symbols:percent')
    const [expenseSum, setExpenseSum] = useState(0)
    const [debtors, setDebtors] = useState([])
    const [eachShare, setEachShare] = useState(0)
    const [eachPercent, setEachPercent] = useState([]);
    const [valueError, setValueError] = useState('')


    // useEffect(() => {
    //         console.log(eachPercent);
    //         if (shareMethod === 'percent') {
    //             try {
    //                 const sum = Object.values(eachPercent).reduce((acc, curr) => acc + curr, 0);
    //                 console.log(sum);
    //                 if (sum === 100) {
    //                     console.log(sum, 100, typeof(sum), typeof(100))
    //                     setValueError('Должно быть 100%')
    //                 }
    //             } catch (error) {
    //
    //             }
    //         }
    //         if (shareMethod === 'sigma') {
    //
    //         }
    //     }, [eachPercent, shareMethod]);

    useEffect(() => {
        console.log(shareMethod)

        try {
            const sum = Object.values(eachPercent).reduce((acc, curr) => acc + curr, 0);
            if (shareMethod === 'percent') {
                if (sum !== 100) {
                    setValueError('!= 100%');

                }
            } else if (shareMethod === 'sigma') {
                if (sum !== parseInt(expenseSum)) {
                    console.log(sum, expenseSum)
                    setValueError('!= expenseSum');
                }
            } else if (shareMethod === 'divider') {
                setValueError('');
            } else {
                setValueError('');
            }

        } catch (error) {

        }

        //     } else if (shareMethod === 'sigma') {
        //         console.log(sum)
        //         console.log(parseInt(expenseSum), sum)
        //
        //
        //         if (parseInt(sum) !== parseInt(expenseSum)) {
        //             setValueError(`${expenseSum}`)
        //         }
        //     } else {
        //         setValueError('')
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }, [expenseSum, shareMethod, eachPercent])


    useEffect(() => {
        setDebtors(wallet?.users.map((user) => user.id))
        const initalPercent = wallet?.users.reduce((acc, user) => {
            acc[user.id] = 100 / (wallet.users).length;
            return acc;
        }, {});
        setEachPercent(initalPercent)
    }, [wallet]);

    const handleEachPercent = (event, userId,) => {
        // console.log(event.target.value)
        // const userId = user.id; // получаем идентификатор пользователя
        // const newValue = event.target.value; // получаем новое значение из элемента управления
        //
        // // Создаем новый объект, копируя предыдущее состояние eachPercent
        const updatedEachPercent = {...eachPercent};
        //
        // // Обновляем значение для определенного пользователя
        updatedEachPercent[userId] = parseInt(event.target.value);
        //
        // // Обновляем состояние eachPercent с помощью нового объекта
        setEachPercent(updatedEachPercent);
    };


    useEffect(() => {

        if (debtors.length > 0) {
            setEachShare(
                parseInt(expenseSum / debtors?.length)
            )
        } else setEachShare(0)

        const initalPercent = wallet?.users.reduce((acc, user) => {
            if (shareMethod === 'percent') {
                acc[user.id] = 100 / (wallet.users).length;
                return acc;
            }
            if (shareMethod === 'sigma') {
                acc[user.id] = expenseSum / (wallet.users).length;
                return acc;
            }
            if (shareMethod === 'divider') {
                acc[user.id] = 1;
                return acc
            }
        }, {});
        setEachPercent(initalPercent)
    }, [expenseSum])


// useEffect(() => {
//     setDebtors([])
// }, [debtors]);


    useEffect(() => {
        // console.log(debtors)
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
        if (debtors?.length > 0) {
            setEachShare(
                expenseSum / debtors?.length
            )
        } else setEachShare(0);
    }, [debtors]);


    useEffect(() => {
        if (shareMethod === 'percent') {
            setShareIcon("material-symbols:percent")
        }
        if (shareMethod === 'sigma') {
            setShareIcon("mdi:sigma")
        }
        if (shareMethod === "divider") {
            setShareIcon("mdi:division")
        }
    }, [shareMethod]);

    useEffect(() => {
        const initalPercent = wallet?.users.reduce((acc, user) => {
            if (shareMethod === 'percent') {
                acc[user.id] = 100 / (wallet.users).length;
                return acc;
            }
            if (shareMethod === 'sigma') {
                acc[user.id] = expenseSum / (wallet.users).length;
                return acc;
            }
            if (shareMethod === 'divider') {
                acc[user.id] = 1;
                return acc
            }
        }, {});
        setEachPercent(initalPercent)
    }, [shareMethod]);

// const initalPercent = wallet?.users.reduce((acc, user) => {
//     if (shareMethod === 'percent') {
//         acc[user.id] = 100 / (wallet.users).length;
//         return acc;
//     }
// }, {});
// setEachPercent(initalPercent)
// }
// } else {
//      {
//         setShareIcon("mdi:sigma")
//     const initalPercent = wallet?.users.reduce((acc, user) => {
//     if (shareMethod === 'percent') {
//         acc[user.id] = expenseSum / (wallet.users).length;
//         return acc;
//     }
// }, {});

// } else {
//     setShareIcon("mdi:division")
// }
// }


// const defaultValue = () => {
//     // if (shareMethod === "percent") {
//     //     if ((wallet.users).length > 0) {
//     //         return 100 / (wallet.users).length
//     //     } else return 0
//     // }
//     // if (shareMethod === "sigma") {
//     //     if ((wallet.users).length > 0) {
//     //         return expenseSum / (wallet.users).length
//     //     } else return 0
//     // }
// }

    const handleSetFreeMethod = () => {
        if (freeMethod === "free") {
            setFreeMethod('equal')
        } else {
            setFreeMethod('free')
            setShareMethod('percent')
        }
    };

// useEffect(() => {
//     console.log(freeMethod);
// }, [freeMethod]);


    const handleShareMethod = (value) => {
        if (value === shareMethod) {
        } else setShareMethod(value)
    }


    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });


    const handleDateChange = (newValue) => {
        // console.log("newValue:", newValue);
        setDate(newValue);
    }


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${id}`);
            const data = await response.json();
            setWallet(data);
            setLoading(false);
            // console.log(data)
        } catch (error) {
            // console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [id]);


    if (loading) {
        return (
            <div className="flex h-screen">
                <div className="m-auto p-auto">
                    <span className="loading loading-bars loading-lg"></span>;
                </div>
            </div>
        )
    }


    return (
        <>
            <Header wallet={wallet} fetchData={fetchData}/>


            <button className="btn" onClick={() => window.my_modal_1.showModal()}>open modal</button>
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">

                    <h3 className="font-bold text-lg pb-2">Добавление расхода</h3>

                    <label className="label">
                        <span className="label-text-alt">Название</span>

                        {/*<span className="label-text-alt">Bottom Right label</span>*/}
                    </label>
                    <input type="text" placeholder="билеты в кино, например"
                           className="input input-bordered w-full max-w p-2"/>


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


                    {/*<div className="join">*/}
                    <label className="label">
                        <span className="label-text-alt">Сумма</span>
                    </label>
                    <input type="number" placeholder="сумма" onChange={event => setExpenseSum(event.target.value)}
                           className="input join-item input-bordered w-full max-w p-2 mb-2"/>


                    {/*<label className="label">*/}
                    {/*<span className="label-text-alt">Bottom Left label</span>*/}
                    {/*<span className="label-text-alt">Bottom Right label</span>*/}
                    {/*</label>*/}
                    {/*<button className="btn rounded-r-full join-item btn-disabled"><span className="text-xl">$</span>*/}
                    {/*</button>*/}
                    {/*</div>*/}
                    <label className="label cursor-pointer p-2 justify-center text-xl">
                        <span
                            className={`label-text flex text-sm pr-2 text-xl ${freeMethod === "equal" ? "text-primary" : ""}`}>поровну</span>
                        <input type="checkbox" id="method" onChange={handleSetFreeMethod} className="toggle toggle-lg"/>
                        <span
                            className={`label-text flex text-sm pl-2 text-xl ${freeMethod === "free" ? "text-primary" : ""}`}>произвольно</span>
                    </label>


                    {freeMethod === "equal"
                        ?
                        <>
                            <div>между</div>
                            <div className={"flex"}>
                                {wallet.users.map((user) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <React.Fragment key={user.id}>
                                        <label className={"label"}>
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
                                {eachShare}</div> : <></>}
                        </>
                        :
                        <>
                            <div className="join flex mt-2 pb-10 gap-3">
                                <input className="btn btn-outline" type="radio" name="options"
                                       onChange={() => handleShareMethod('percent')} defaultChecked={true}
                                       aria-label="%"/>
                                <input className="btn btn-outline" type="radio" name="options"
                                       onChange={() => handleShareMethod('sigma')} aria-label="Σ"/>
                                <input className="btn btn-outline" type="radio" name="options"
                                       onChange={() => handleShareMethod('divider')} aria-label="÷"/>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">

                                {wallet.users.map((user) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div className="relative" key={user.id}>
                                        <span className="label-text-alt">{user.name}</span>

                                        <input type="number"
                                            // defaultValue={Object.entries(eachPercent).filter(([key, value]) => key === user.id)[0][1]}
                                               onChange={event => handleEachPercent(event, user.id)}
                                               value={Object?.entries(eachPercent).filter(([key, value]) => key === user.id)[0][1]}
                                               className="px-4 py-2 border rounded-lg pl-10 input input-bordered w-full"/>
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Icon icon={shareIcon}
                                                  style={{fontSize: '20px', position: 'absolute'}}/>
                                        </div>
                                    </div>
                                ))}

                            </div>

                            <div className="text-red-400">{valueError}</div>

                        </>
                    }


                    {/*<p className="py-4">Press ESC key or click the button below to close</p>*/}
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary">Добавить</button>
                        <button className="btn">Отмена</button>

                    </div>


                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex m-2">
                <div>
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">Cookies!</h2>
                            <p>We are using cookies for no reason.</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Accept</button>
                                <button className="btn btn-ghost">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*<div className="min-h-screen flex flex-col">*/}
            {/*    <div className="flex-grow overflow-y-auto px-4 py-8">*/}


            {/*<div className="py-8 flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">*/}
            {/*    <Users wallet={wallet} setLoading={setLoading} fetchData={fetchData}/>*/}
            {/*    <Expenses wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>*/}
            {/*    <Debts wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}
        </>
    );
}
