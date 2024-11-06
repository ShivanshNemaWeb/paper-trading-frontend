
'use client'
import Cookies from "js-cookie";
import Link from "next/link";
const Simple = () => {
    const token = Cookies.get('token');
    return (
        <div className="simple-bg relative">
            <div className="simpleone"></div>
            <div className="simpletwo"></div>
            <div className="simplethree"></div>
            <div className="simplefour"></div>
            <div className="simplefive"></div>
            <div className="mx-auto max-w-5xl py-24 px-6">
                <h3 className="text-center text-offwhite text-3xl lg:text-5xl font-semibold mb-6">A simple, secure way to invest <br /> in stocks</h3>
                <p className="text-center text-bluish text-lg font-normal mb-8">Experience a straightforward and secure approach to investing in stocks with our platform</p>
                <div className="flex justify-center ">
                    {
                        token? (
                            <Link href="/dashboard">
                                <button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton'>Invest Now</button>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <button className='text-xl font-semibold text-white py-4 px-6 lg:px-12 navbutton'>Invest Now</button>
                            </Link>
                        )
                    }
                </div>
            </div>
            <div className="simplesix"></div>
            <div className="simpleseven"></div>
            <div className="simpleeight"></div>
            <div className="simplenine"></div>
            <div className="simpleten"></div>
        </div>
    )
}

export default Simple;
