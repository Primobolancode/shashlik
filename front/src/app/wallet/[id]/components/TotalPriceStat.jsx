import React from "react";

export default function TotalPriceStat({wallet}) {
    return (
        <div className="stats shadow-2xl md:hidden">
            <div className="stat flex-col flex-wrap flex justify-content-center">
                <div className="stat-title flex self-center">Общая стоимость</div>
                <div className="stat-value flex self-center">{wallet.total_price} </div>
                <div className="stat-desc flex self-center">всего мероприятия</div>
            </div>
        </div>

    )

}