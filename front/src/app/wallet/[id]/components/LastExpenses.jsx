import React from "react";

export default function LastExpenses({wallet}) {
    console.log(wallet)
    return (
        <>
            <p className="text-xl">Последние расходы: {wallet.expenses.length}</p>
            <div className="h-32 carousel rounded-box rounded-xl">
            {wallet.expenses.map((expense) => (


                // eslint-disable-next-line react/jsx-key
                    <div className="carousel-item h-full" key={expense.id}>
                        <div className="bg-danger flex p-2 flex-col justify-start h-full border border-b-indigo-100 w-full">
                            <div className="">
                                Сумма: {expense.summ}
                            </div>
                            <div className="">
                                {/*Оплачивал: {expense.creditor.name}*/}
                                <div className="tooltip tooltip-bottom" data-tip={`${expense.creditor.name}`} key={expense.creditor.id}>
                            <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${expense.creditor.name}`}
                                 className="w-12 h-12 rounded-full " alt={''}/>
                        </div>
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



// <div className="carousel w-full">
//   <div id="slide1" className="carousel-item relative w-full">
//     <img src="/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//       <a href="#slide4" className="btn btn-circle">❮</a>
//       <a href="#slide2" className="btn btn-circle">❯</a>
//     </div>
//   </div>
//   <div id="slide2" className="carousel-item relative w-full">
//     <img src="/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//       <a href="#slide1" className="btn btn-circle">❮</a>
//       <a href="#slide3" className="btn btn-circle">❯</a>
//     </div>
//   </div>
//   <div id="slide3" className="carousel-item relative w-full">
//     <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//       <a href="#slide2" className="btn btn-circle">❮</a>
//       <a href="#slide4" className="btn btn-circle">❯</a>
//     </div>
//   </div>
//   <div id="slide4" className="carousel-item relative w-full">
//     <img src="/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//       <a href="#slide3" className="btn btn-circle">❮</a>
//       <a href="#slide1" className="btn btn-circle">❯</a>
//     </div>
//   </div>
// </div>

//