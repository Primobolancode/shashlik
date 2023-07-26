import Image from 'next/image'

export default function Home() {
    return (
        <div className="flex h-screen">
            <div className="m-auto p-auto">
                {/*<h1>WELCOME</h1>*/}
                <h1><a href='/wallet'>create new wallet</a></h1>
            </div>
        </div>
    )
}
