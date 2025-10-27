"use client";

import React from "react";
import { useAuth, logout } from "@/app/lib/firebaseauth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Nav() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout realizado com sucesso!");
            router.push("/");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            toast.error("Erro ao fazer logout");
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <nav className="flex gap-6">
            {!user ? (
                <>
                    <Link href="/login">
                        <button className="text-white font-semibold text-lg px-6 py-4 rounded-lg border-l-1 border-r-1 border-t-0 border-b-0 border-[#1a3c4e] hover:border-0 hover:bg-[rgb(199,108,68)] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200">
                            Entrar
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="text-white font-semibold text-lg px-6 py-4 rounded-lg border-l-1 border-r-1 border-t-0 border-b-0 border-[#1a3c4e] hover:border-0 hover:bg-[rgb(199,108,68)] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200">
                            Cadastrar
                        </button>
                    </Link>
                </>
            ) : (
                <button
                    onClick={handleLogout}
                    className="text-white font-semibold text-lg px-6 py-4 rounded-lg border-l-1 border-r-1 border-t-0 border-b-0 border-[#1a3c4e] hover:border-0 hover:bg-[rgb(199,108,68)] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-200"
                >
                    Sair
                </button>
            )}
        </nav>
    );
}