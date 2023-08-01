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
import NewLastExpenses from "@/app/wallet/[id]/components/NewLastExpenses";
import ExpenseCarousel from "@/app/wallet/[id]/components/ExpenseCarousel";
import styles from './styles.module.css'
import PseudoBorder from "@/app/wallet/[id]/components/chart/PseudoBorder";
import DebtsList from "@/app/wallet/[id]/components/DebtsList";

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

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 flex m-2 md:hidden">
                <UsersWithAvatars wallet={wallet} setLoading={setLoading} fetchData={fetchData}/>
                <div className="divider p-0 m-0"></div>
                <ExpenseCarousel wallet={wallet}/>
                <AddNewExpenseButton wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>
                <div className="divider p-0 m-0"></div>
                <DebtsList wallet={wallet}/>
            </div>
        </>
    );
}


//