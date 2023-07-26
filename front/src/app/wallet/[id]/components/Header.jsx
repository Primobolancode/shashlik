import {Icon} from "@iconify/react";

export default function Header({wallet, fetchData}){
    const copyToClipBoard = () => {
        navigator.clipboard.writeText(document.location)
    }
    return (
                        <div className="w-full m-auto flex border rounded-xl border-cyan-500 items-center p-2 justify-between">
                    <div className="text-2xl">{wallet.title}</div>
                    <div className="flex items-center">
                        <span onClick={() => copyToClipBoard()}
                        >
                        <Icon icon="ic:baseline-content-copy"
                              style={{fontSize: '20px', marginRight: '10px', cursor: "pointer"}}/>
                        </span>
                        <span onClick={() => fetchData()}>
                        <Icon icon="material-symbols:refresh"
                              style={{fontSize: '26px', cursor: "pointer"}}/>
                        </span>
                    </div>
                </div>
    )
}