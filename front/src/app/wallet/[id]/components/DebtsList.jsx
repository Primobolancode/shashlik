import React from "react";

export default function DebtsList({wallet}) {
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="mb-2 ml-2 text-2xl ">Долги</div>
                <div className="underline font-thin cursor-pointer text-sm mr-2">{`погашенные долги`}</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <tbody>
                    {wallet.debts.map((debt) => {
                        return (
                            // eslint-disable-next-line react/jsx-key

                            <tr key={debt.id}>
                                <td>
                                    <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debt.debtor.name}`}
                                         className="w-12 h-12 rounded-full" alt={''}/>
                                    {debt.debtor.name}
                                </td>
                                <td>
                                    <div className="flex flex-col items-center">
                                        <div className="flex self-center">
                                            <div className="font-bold text-2xl">{(debt.summ).toFixed(2)}</div>
                                            <div className="font-thin">{`₽`}</div>
                                        </div>
                                        <div>перечисляет</div>
                                        <div className="underline font-thin text-emerald-800 cursor-pointer text-sm self-center">погасить</div>
                                    </div>
                                </td>


                                <td>
                                    <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debt.creditor.name}`}
                                         className="w-12 h-12 rounded-full " alt={''}/>
                                    {debt.creditor.name}
                                </td>
                            </tr>


                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>

    )
}