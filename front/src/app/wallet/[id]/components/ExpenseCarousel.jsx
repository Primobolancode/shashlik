import React, {useState} from "react";
import {Icon} from "@iconify/react";
import ScrollingText from "@/app/wallet/[id]/components/ScrollingText";

export default function ExpenseCarousel({wallet}) {
    const [detail, setDetail] = useState()
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="mb-2 ml-2 text-2xl ">Расходы</div>
                <div className="underline font-thin cursor-pointer text-sm mr-2">{`все расходы (${wallet.expenses.length})`}</div>
            </div>
            <div className="carousel">
                {wallet.expenses.map((expense, index) => (

                    // eslint-disable-next-line react/jsx-key
                    <div id={`${index}`} className="wrapper rounded-2xl relative w-full carousel-item flex-col" key={index}>
                        <div className="flex flex-row justify-between items-center">
                            <div>
                                <a href={`${index === 0 ? `#${(wallet.expenses).length - 1}` : `#${index - 1}`}`}
                                   className="btn btn-circle">❮</a>
                            </div>
                            <div className="flex flex-col">
                                <div className="title text-xl font-bold self-center">{expense.title}</div>

                                <div className="self-center text-sm font-thin">
                                    {new Date(expense.datetime).getDate().toString().padStart(2, '0')}-{(new Date(expense.datetime).getMonth() + 1).toString().padStart(2, '0')}-{new Date(expense.datetime).getFullYear().toString().slice(-2)} {new Date(expense.datetime).getHours()}:{new Date(expense.datetime).getMinutes()}
                                </div>
                                <div className="flex self-center">
                                    <div className="font-bold text-2xl">{expense.summ}</div>
                                    <div className="font-thin">{`₽`}</div>
                                </div>
                                <div className="underline font-thin cursor-pointer text-sm self-center">
                                    подробнее
                                </div>

                            </div>
                            <div>
                                <a href={`${(wallet.expenses).length - 1 === index ? "#0" : `#${index + 1}`}`}
                                   className="btn btn-circle">❯</a>
                            </div>


                        </div>
                        <div className="flex">


                        </div>


                    </div>
                ))}
            </div>
        </>
    )
}