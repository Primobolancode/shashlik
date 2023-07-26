'use client'
import React, {useEffect, useState} from "react";
import {Icon} from '@iconify/react';
import Header from "@/app/wallet/[id]/components/Header";
import Users from "@/app/wallet/[id]/components/Users";
import Expenses from "@/app/wallet/[id]/components/Expenses";
import Debts from "@/app/wallet/[id]/components/Debts";

export default function Wallet({params}) {
    const {id} = params;
    const [wallet, setWallet] = useState();
    const [loading, setLoading] = useState(true);

    // const [expenseTitle, setExpenseTitle] = useState('')
    // const [summ, setSumm] = useState(0)
    // const [creditor, setCreditor] = useState()
    // const [debtors, setDebtors] = useState([])



    // const deleteExpense = async (expense_id) => {
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: {'Content-Type': 'application/json'},
    //     };
    //     try {
    //         const response = await fetch(`http://localhost/api/v1/event/${id}/expense/${expense_id}`, requestOptions)
    //         const data = await response.json();
    //         await fetchData()
    //
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         setLoading(false);
    //     }
    //
    // }

    // const addExpense = async () => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(
    //             {
    //                 title: expenseTitle,
    //                 creditor_id: creditor,
    //                 debtors_id: debtors,
    //                 summ: summ
    //             }
    //         )
    //     };
    //     try {
    //         const response = await fetch(`http://localhost/api/v1/event/${id}/expense`, requestOptions)
    //         const data = await response.json();
    //         await fetchData()
    //         setCreditor('')
    //         setDebtors([])
    //         setSumm(0)
    //         setExpenseTitle('')
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         setLoading(false);
    //     }
    // };

    // const handleCheckboxChange = (event) => {
    //     const userId = event.target.value;
    //     if (event.target.checked) {
    //         setDebtors((prevDebtors) => [...prevDebtors, userId]);
    //     } else {
    //         setDebtors((prevDebtors) => prevDebtors.filter((id) => id !== userId));
    //     }
    // };

    // useEffect(() => {
    //     if (wallet) {
    //         setCreditor(wallet.users[0].id)
    //     }
    // }, [wallet]);


    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`http://api.paywal.ru/api/v1/event/${id}`);
            const data = await response.json();
            setWallet(data);
            setLoading(false);
            console.log(data)
        } catch (error) {
            console.error("Error fetching data:", error);
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
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow overflow-y-auto px-4 py-8">

                <Header wallet={wallet} fetchData={fetchData}/>
                <div className="py-8 flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <Users wallet={wallet} setLoading={setLoading} fetchData={fetchData}/>
                    <Expenses wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>
                    <Debts wallet={wallet} fetchData={fetchData} setLoading={setLoading}/>
                </div>
            </div>
        </div>
    );
}
