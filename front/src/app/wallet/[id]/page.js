'use client'
import React, {useCallback, useEffect, useState} from "react";
import {Icon} from '@iconify/react';
import Header from "@/app/wallet/[id]/components/Header";
import Users from "@/app/wallet/[id]/components/Users";
import Expenses from "@/app/wallet/[id]/components/Expenses";
import Debts from "@/app/wallet/[id]/components/Debts";

import domain from "config";
import Datepicker from "react-tailwindcss-datepicker";
import TotalPriceStat from "@/app/wallet/[id]/components/TotalPriceStat";
import AddNewExpenseButton from "@/app/wallet/[id]/components/AddNewExpenseButton";
import LastExpenses from "@/app/wallet/[id]/components/LastExpenses";
import UsersWithAvatars from "@/app/wallet/[id]/components/UsersWithAvatars";

export default function Wallet({params}) {
    const {id} = params;
    const [wallet, setWallet] = useState();
    const [loading, setLoading] = useState(true);


    // const [expenseSum, setExpenseSum] = useState(parseFloat(0.0))

    // const [eachShare, setEachShare] = useState(0)
    // const [eachPercent, setEachPercent] = useState([]);
    // const [valueError, setValueError] = useState('')


    // useEffect(() => {
    //     if (debtors?.length > 0) {
    //         setEachShare(
    //             parseFloat(expenseSum / debtors?.length)
    //         )
    //     } else setEachShare(0);
    // }, [debtors]);


    // useEffect(() => {
    //     const initalPercent = wallet?.users.reduce((acc, user) => {
    //         if (shareMethod === 'percent') {
    //             acc[user.id] = 100 / (wallet.users).length;
    //             return acc;
    //         }
    //         if (shareMethod === 'sigma') {
    //             acc[user.id] = parseFloat(expenseSum / (wallet.users).length);
    //             return acc;
    //         }
    //         if (shareMethod === 'divider') {
    //             acc[user.id] = 1;
    //             return acc
    //         }
    //     }, {});
    //     setEachPercent(initalPercent)
    // }, [shareMethod]);


    // useEffect(() => {
    //     if (shareMethod === 'percent') {
    //         setShareIcon("material-symbols:percent")
    //     }
    //     if (shareMethod === 'sigma') {
    //         setShareIcon("mdi:sigma")
    //     }
    //     if (shareMethod === "divider") {
    //         setShareIcon("mdi:division")
    //     }
    // }, [shareMethod]);
    // const eachValue = (user_id) => {
    //     try {
    //         if (shareMethod === 'percent') {
    //             const result = parseFloat(Object?.entries(eachPercent).filter(([key, value]) => key === user_id)[0][1]).toFixed(2) * expenseSum / 100
    //             if (result) {
    //                 return `~ ${result.toFixed(2)}`
    //             }
    //
    //         }
    //     } catch (error) {
    //         return 0
    //     }
    //
    // }

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


    // const handleShareMethod = (value) => {
    //     if (value === shareMethod) {
    //     } else setShareMethod(value)
    // }


    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    });


    const handleDateChange = (newValue) => {
        setDate(newValue);
    }


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://${domain}/api/v1/event/${id}`);
            const data = await response.json();
            setWallet(data);
            setLoading(false);
        } catch (error) {
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

    // useEffect(() => {
    //     try {
    //         const sum = Object.values(eachPercent).reduce((acc, curr) => acc + curr, 0);
    //         console.log('here ')
    //         if (shareMethod === 'percent' && sum !== 100) {
    //             console.log('error by percent', sum + '< 100');
    //             setValueError('error by percent', sum + '< 100');
    //         } else {
    //             setValueError('')
    //
    //         }
    //         // } else if (shareMethod === 'sigma' && sum !== expenseSum) {
    //         //     console.log('error by sigma', sum + ` !== ${expenseSum}`);
    //         // } else {
    //         //     console.log('OK')
    //         // }
    //         // console.log(shareMethod, expenseSum, sum)
    //     } catch (error) {
    //         // console.log(error)
    //     }
    // }, [shareMethod, eachPercent, expenseSum])


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

            <div></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex m-2 md:hidden">
                <UsersWithAvatars wallet={wallet} setLoading={setLoading} fetchData={fetchData}/>
                <AddNewExpenseButton wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>
                <TotalPriceStat wallet={wallet}/>
                <LastExpenses wallet={wallet}/>
                <Users wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>
                <Debts wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>


                {/*<p className="text-xl">Последние расходы</p>*/}
                {/*<div className="h-32 carousel carousel-vertical rounded-box rounded-xl">*/}
                {/*    <div className="carousel-item h-full">*/}
                {/*        <div className="bg-danger h-full border border-b-indigo-100 w-full">*/}
                {/*            123*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="carousel-item h-full">*/}
                {/*        <div className="bg-danger h-full border border-b-indigo-100 w-full">*/}
                {/*            <div>123</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<div className="overflow-x-auto">*/}
                {/*    <table className="table table-xl">*/}
                {/*        <thead>*/}
                {/*        <tr>*/}
                {/*            <th>Имя</th>*/}
                {/*        </tr>*/}
                {/*        </thead>*/}
                {/*        <tbody>*/}
                {/*        {wallet.users.map((user) => (*/}
                {/*            <tr>*/}
                {/*                <th>{user.name}</th>*/}
                {/*            </tr>*/}
                {/*        ))}*/}

                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*</div>*/}


                {/*    <div>*/}
                {/*        <div className="card bg-neutral text-neutral-content">*/}
                {/*            <div className="card-body items-center text-center">*/}
                {/*                <h2 className="card-title">Cookies!</h2>*/}
                {/*                <p>We are using cookies for no reason.</p>*/}
                {/*                <div className="card-actions justify-end">*/}
                {/*                    <button className="btn btn-primary">Accept</button>*/}
                {/*                    <button className="btn btn-ghost">Deny</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div className="card bg-neutral text-neutral-content">*/}
                {/*            <div className="card-body items-center text-center">*/}
                {/*                <h2 className="card-title">Cookies!</h2>*/}
                {/*                <p>We are using cookies for no reason.</p>*/}
                {/*                <div className="card-actions justify-end">*/}
                {/*                    <button className="btn btn-primary">Accept</button>*/}
                {/*                    <button className="btn btn-ghost">Deny</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div className="card bg-neutral text-neutral-content">*/}
                {/*            <div className="card-body items-center text-center">*/}
                {/*                <h2 className="card-title">Cookies!</h2>*/}
                {/*                <p>We are using cookies for no reason.</p>*/}
                {/*                <div className="card-actions justify-end">*/}
                {/*                    <button className="btn btn-primary">Accept</button>*/}
                {/*                    <button className="btn btn-ghost">Deny</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div className="card bg-neutral text-neutral-content">*/}
                {/*            <div className="card-body items-center text-center">*/}
                {/*                <h2 className="card-title">Cookies!</h2>*/}
                {/*                <p>We are using cookies for no reason.</p>*/}
                {/*                <div className="card-actions justify-end">*/}
                {/*                    <button className="btn btn-primary">Accept</button>*/}
                {/*                    <button className="btn btn-ghost">Deny</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div className="card bg-neutral text-neutral-content">*/}
                {/*            <div className="card-body items-center text-center">*/}
                {/*                <h2 className="card-title">Cookies!</h2>*/}
                {/*                <p>We are using cookies for no reason.</p>*/}
                {/*                <div className="card-actions justify-end">*/}
                {/*                    <button className="btn btn-primary">Accept</button>*/}
                {/*                    <button className="btn btn-ghost">Deny</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <div className="card bg-neutral text-neutral-content">*/}
                {/*            <div className="card-body items-center text-center">*/}
                {/*                <h2 className="card-title">Cookies!</h2>*/}
                {/*                <p>We are using cookies for no reason.</p>*/}
                {/*                <div className="card-actions justify-end">*/}
                {/*                    <button className="btn btn-primary">Accept</button>*/}
                {/*                    <button className="btn btn-ghost">Deny</button>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
            </div>
            <div className="btm-nav md:hidden">
                <button className={"active"}>
                    <Icon icon={"material-symbols:home-outline-rounded"} className={"text-2xl"}></Icon>
                    <span className="btm-nav-label">Home</span>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="btm-nav-label">Warnings</span>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span className="btm-nav-label">Statics</span>
                </button>
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
