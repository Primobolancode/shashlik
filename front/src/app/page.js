'use client'
import Image from 'next/image'
import {Icon} from "@iconify/react";
import {LANGS} from "../../langs";
import React, {useCallback, useEffect, useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function Home() {
    const [lang, setLang] = useState(LANGS[0])
    const [mode, setMode] = useState('dark')
    const [wallet, setWallet] = useState({users: [{name: "John"}, {name: "Ann"}]});
    const [debtors, setDebtors] = useState([wallet.users])
    const [expenseSum, setExpenseSum] = useState(parseFloat("12.33"))
    const [creditor, setCreditor] = useState()
    const [eachShare, setEachShare] = useState(0)
    const [shareMethod, setShareMethod] = useState('percent')
    const [eachPercent, setEachPercent] = useState([]);

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


    useEffect(() => {
        if (debtors?.length > 0) {
            setEachShare(
                parseFloat(expenseSum / debtors?.length)
            )
        } else setEachShare(0);
    }, [debtors]);

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

    function roundNumber(number) {
        const decimalPlaces = number.toString().split('.')[1]?.length || 0;

        if (decimalPlaces > 2) {
            return `~ ${Number(number.toFixed(2))}`;
        }
        return number;
    }


    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">PAYWAL</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <details>
                                <summary>
                                    <Icon icon="mdi:language" width="30px" height="30px"/>
                                </summary>
                                <ul className="p-2 bg-base-100">
                                    {LANGS.map((currentLang, index) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <li key={index}>
                                            <a
                                                className={`${currentLang.Name === lang.Name ? "bg-gray-500 text-gray-200" : ""}`}
                                                onClick={() => setLang(LANGS[index])}
                                            >
                                                {currentLang.Name}
                                            </a>
                                        </li>
                                    ))}


                                </ul>
                            </details>

                        </li>
                        <li>
                            <a onClick={() => mode === "light" ? setMode("dark") : setMode("light")}>
                                {
                                    mode === "light" ?
                                        <Icon width="30px" height="30px"
                                              icon="material-symbols:dark-mode-outline-rounded"/>
                                        :
                                        <Icon width="30px" height="30px" icon="material-symbols:sunny-outline"/>
                                }
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
            <section className="flex w-full border border-1 flex-row p-2">
                <div className="flex flex-col w-1/2 h-full">
                    <div className="flex pl-6 pt-4 underline cursor-pointer text-sm">
                        <span>v0.22</span>
                    </div>
                    <div className="flex flex-col thin flex-grow">
                        <div className="text-base-content text-4xl flex font-bold pl-2">
                            Самый популярный
                        </div>
                        <div className="text-base-content text-2xl flex pl-2 font-thin">
                            способ
                        </div>
                        <div className="text-base-content text-4xl flex font-bold p-2">
      <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        разделить счет с друзьями
      </span>
                        </div>
                        <div className="text-base-content text-sm flex text-gray-200 font-thin pl-2">
                            или второй половинкой, поровну или долями или еще как угодно
                        </div>
                    </div>
                </div>
                <div className="w-1/2 ">
                    <form method="dialog" className="modal-box transform -rotate-5 skew-x-12">
                        {/*TITLE*/}
                        <h3 className="font-bold text-lg pb-2">Добавление расхода</h3>
                        {/*NAME*/}
                        <label className="label">
                            <span className="label-text-alt">Название</span>
                        </label>
                        <input type="text" placeholder="билеты в кино, например"
                            // onChange={event => setExpenseTitle(event.target.value)}
                               className="input input-bordered w-full max-w p-2"/>
                        {/*DATE*/}
                        {/*<label className="label">*/}
                        {/*    <span className="label-text-alt">Дата</span>*/}
                        {/*</label>*/}
                        {/*<Datepicker*/}
                        {/*    inputClassName="input input-bordered w-full max-w"*/}
                        {/*    startWeekOn="mon"*/}
                        {/*    i18n={"ru"}*/}
                        {/*    // value={date}*/}
                        {/*    // onChange={handleDateChange}*/}
                        {/*    asSingle={true}*/}
                        {/*    popoverDirection="down"*/}
                        {/*    useRange={false}*/}
                        {/*    primaryColor={"fuchsia"}*/}
                        {/*    showFooter={true}*/}
                        {/*    disabled={true}*/}
                        {/*/>*/}
                        {/*CREDITOR*/}
                        <label className="label">
                            <span className="label-text-alt">Кто платит?</span>
                        </label>
                        <select className="select select-bordered w-full max-w p-2"
                                onChange={event => setCreditor(event.target.value)}>
                            <option disabled defaultValue>Кто платит?</option>
                            {wallet?.users.map((user) => (
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
                               defaultValue={expenseSum}
                               className="input join-item input-bordered w-full max-w p-2 mb-2"/>


                        {/*<label className="label cursor-pointer p-2 justify-center text-xl">*/}
                        {/*    <span className={`label-text flex text-sm pr-2 text-xl ${freeMethod === "equal" ? "text-primary" : ""}`}>поровну</span>*/}
                        {/*    <input type="checkbox" id="method" onChange={handleSetFreeMethod}*/}
                        {/*           className="toggle toggle-lg"/>*/}
                        {/*    <span*/}
                        {/*        className={`label-text flex text-sm pl-2 text-xl ${freeMethod === "free" ? "text-primary" : ""}`}>произвольно</span>*/}
                        {/*</label>*/}


                        {"equal" === "equal"
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


                            </>
                        }


                        <div className="modal-action">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-primary"
                                // disabled={expenseSum <= 0 || debtors <= 0}
                                // onClick={addExpense}
                            >Добавить
                            </button>
                            <button className="btn">Отмена</button>

                        </div>


                    </form>
                </div>

            </section>
        </>
    )
}
