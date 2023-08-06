import domain from "../../../../../config";
import {useState} from "react";


export default function DebtsList({wallet, fetchData, setLoading}) {
    const [repaidDebtsView, setRepaidDebtsView] = useState(false)
    const RepaidDebt = async (type, debt_id) => {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        };
        try {
            console.log(`http://${domain}/api/v1/event/${wallet._id}/debt/${debt_id}/repaid/`)
            const response = await fetch(`http://${domain}/api/v1/event/${wallet._id}/debt/${debt_id}/${type}/`, requestOptions)

            const data = await response.json();
            await fetchData()
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="mb-2 ml-2 text-2xl ">{repaidDebtsView ? `Закр. долги (${wallet.debts.filter(debt => debt.repaid).length})` : `Долги (${wallet.debts.filter(debt => !debt.repaid).length})`}</div>
                <div
                    className="underline font-thin cursor-pointer text-sm mr-2"
                    onClick={() => repaidDebtsView ? setRepaidDebtsView(false) : setRepaidDebtsView(true)}
                >
                    {repaidDebtsView ? `долги (${wallet.debts.filter(debt => !debt.repaid).length})` : `закрытые долги (${wallet.debts.filter(debt => debt.repaid).length})`}
                </div>
            </div>
            {!repaidDebtsView &&
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <tbody>
                    {wallet.debts
                            .filter(debt => debt.repaid === false)
                            .map((debt) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key

                                    <tr key={debt.id}>
                                        <td>
                                            <img
                                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debt.debtor.name}`}
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
                                                <div
                                                    className="underline font-thin text-emerald-800 cursor-pointer text-sm self-center"
                                                    onClick={() => RepaidDebt('repaid', debt.id)}
                                                >
                                                    закрыть
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                            <img
                                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debt.creditor.name}`}
                                                className="w-12 h-12 rounded-full " alt={''}/>
                                            {debt.creditor.name}
                                        </td>
                                    </tr>


                                );
                            })}
                    </tbody>
                </table>
            </div>
            }
              {!!repaidDebtsView &&
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <tbody>
                    {wallet.debts
                            .filter(debt => debt.repaid === true)
                            .map((debt) => {
                                return (
                                    // eslint-disable-next-line react/jsx-key

                                    <tr key={debt.id}>
                                        <td>
                                            <img
                                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debt.debtor.name}`}
                                                className="w-12 h-12 rounded-full" alt={''}/>
                                            {debt.debtor.name}
                                        </td>
                                        <td>
                                            <div className="flex flex-col items-center">
                                                <div className="flex self-center">
                                                    <div className="font-bold text-2xl">{(debt.summ).toFixed(2)}</div>
                                                    <div className="font-thin">{`₽`}</div>
                                                </div>
                                                <div>уже перечислил</div>
                                                <div
                                                    className="underline font-thin text-emerald-800 cursor-pointer text-sm self-center"
                                                    onClick={() => RepaidDebt('unrepaid', debt.id)}
                                                >
                                                    отменить закрытие
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                            <img
                                                src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${debt.creditor.name}`}
                                                className="w-12 h-12 rounded-full " alt={''}/>
                                            {debt.creditor.name}
                                        </td>
                                    </tr>


                                );
                            })}
                    </tbody>
                </table>
            </div>
            }
        </>

    )
}