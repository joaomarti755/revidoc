"use client";
import React from "react";

export default function Nav() {
    return (
        <nav className="flex gap-6">
            <a href="/login">
                <button className="text-white font-semibold text-lg px-6 py-4 rounded-lg border-l-1 border-r-1 border-t-0 border-b-0 border-[#1a3c4e] hover:border-0 hover:bg-[rgb(199,108,68)] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200">Entrar</button>
            </a>
            <a href="/register">
                <button className="text-white font-semibold text-lg px-6 py-4 rounded-lg border-l-1 border-r-1 border-t-0 border-b-0 border-[#1a3c4e] hover:border-0 hover:bg-[rgb(199,108,68)] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200">Cadastrar</button>
            </a>
        </nav>
    );
}