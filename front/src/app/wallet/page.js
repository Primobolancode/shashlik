'use client'

import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import domain from 'config.js'
import {LANGS} from "../../../langs";



export default function CreateWallet(params, searchParams) {
    const router = useRouter(); // Получаем объект 'router' с помощью хука 'useRouter' из Next.js
    const [wallet, setWallet] = useState(null);
    const [walletName, setWalletName] = useState('')
    const focusRef = useRef(null);
    useEffect(() => {
        focusRef.current.focus();
    }, []);

    const handleEnterAddNewUserDown = event => {
        if (event.keyCode === 13) {
            fetchData();
        }
    };

    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: `${walletName}`})
        };
        try {
            const response = await fetch(`http://${domain}/api/v1/event/new`, requestOptions)
            const data = await response.json();
            setWallet(data.result)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (wallet) {
            router.push(`/wallet/${wallet}`)
        }
    }, [router, wallet]);


    return (
        <div className="flex h-screen">
            <div className="m-auto p-auto">
                <span className="pb-2 flex justify-center items-center m-auto p-auto">
                    Название мероприятия
                </span>
                <input
                    ref={focusRef}
                    onChange={event => setWalletName(event.target.value)} type="text" placeholder=""
                    onKeyDown={event => handleEnterAddNewUserDown(event)}
                    className="input input-bordered input-primary w-full max-w-xs"/>
                <button className="mt-2 btn flex justify-center items-center m-auto p-auto"
                        onClick={() => fetchData()}>Создать
                </button>
            </div>
        </div>
    )
}
