import React from 'react';
import Nav from './nav';
import Link from 'next/link';
import reviDoc from '../../app/img/logo.png'
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-[#0c1c24] text-white p-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold"><Image src={reviDoc} alt="Logo ReviDoc" width={100} height={100} className="m-5 p-0" /></Link>
                <Nav />
            </div>
        </header>
    );
}