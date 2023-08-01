import React from "react";

export default function NewLastExpenses({wallet}) {
    return (
        <>{wallet.expenses.map((expense) => (
            <>
                <div className="w-full border h-full flex justify-between">


                    <div>
                        <div className="flex flex-col ml-4 h-full self-center items-center justify-center">
                            <img
                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${expense.creditor.name}`}
                                alt="Avatar Tailwind CSS Component"/>
                            <span>{expense.creditor.name}</span>

                        </div>
                    </div>

                    {/*<div className={'flex-col flex'}>*/}
                    {/*    {expense.debtors.map((line) => (*/}
                    {/*        // eslint-disable-next-line react/jsx-key*/}
                    {/*        <div>|</div>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                    <div>
                        <div className={'flex-col flex'}>
                            {expense.debtors.map((debtor) => (
                                // eslint-disable-next-line react/jsx-key
                                <>
                                    <div className="flex flex-row justify">
                                    <img className={"w-10"}
                                        src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debtor.name}`}
                                        alt="Avatar Tailwind CSS Component"/>
                                    <div>{debtor.name}</div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </div>

                </div>
            </>
        ))}

        </>
    )
}