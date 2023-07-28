import React from "react";

export default function LastExpenses({wallet}) {
    console.log(wallet)
    return (
        <>
            <p className="text-xl">Последние расходы: {wallet.expenses.length}</p>
            <div className="h-32 carousel carousel-vertical rounded-box rounded-xl">
            {wallet.expenses.map((expense) => (


                // eslint-disable-next-line react/jsx-key
                    <div className="carousel-item h-full" key={expense.id}>
                        <div className="bg-danger flex p-2 flex-col justify-start h-full border border-b-indigo-100 w-full">
                            <div className="">
                                Сумма: {expense.summ}
                            </div>
                            <div className="">
                                Оплачивал: {expense.creditor.name}
                            </div>
                            <div>
                                За кого: {expense.debtors.map((debtor) => `${debtor.name} `)}
                            </div>
                            <div className="">
                                Дата: {expense.datetime}
                            </div>
                        </div>
                    </div>

            ))}
            </div>

        </>
    )
}


//