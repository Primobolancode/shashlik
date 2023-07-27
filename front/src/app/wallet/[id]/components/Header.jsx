import {Icon} from "@iconify/react";

export default function Header({wallet, fetchData}){
    const copyToClipBoard = () => {
        console.log('click')
        navigator.clipboard.writeText(document.location);
    }
    return (
        <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h7"/>
                            </svg>
                        </label>
                        <ul tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Главная</a></li>
                            <li><a>Расходы</a></li>
                            <li><a>Долги</a></li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost normal-case text-xl">{wallet.title}</a>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator" onClick={() => copyToClipBoard()}>
                    <Icon icon="material-symbols:share"
                              style={{fontSize: '20px'}}/>
                                </div>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                    <Icon icon="material-symbols:settings" style={{fontSize: '20px'}}/>
                    </button>
                </div>
            </div>
                //         <div className="w-full m-auto flex border rounded-xl border-cyan-500 items-center p-2 justify-between">
                //     <div className="text-2xl">{wallet.title}</div>
                //     <div className="flex items-center">
                //         <span onClick={() => copyToClipBoard()}
                //         >
                //         <Icon icon="ic:baseline-content-copy"
                //               style={{fontSize: '20px', marginRight: '10px', cursor: "pointer"}}/>
                //         </span>
                //         <span onClick={() => fetchData()}>
                //         <Icon icon="material-symbols:refresh"
                //               style={{fontSize: '26px', cursor: "pointer"}}/>
                //         </span>
                //     </div>
                // </div>
    )
}