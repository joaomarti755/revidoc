"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/app/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login realizado com sucesso!");
            router.push("/analysis");
        } catch (err: any) {
            console.error("Erro ao fazer login:", err);
            let errorMessage = "Erro ao fazer login. Tente novamente.";
            
            if (err.code === "auth/user-not-found") {
                errorMessage = "Usuário não encontrado. Verifique o email e tente novamente.";
            } else if (err.code === "auth/wrong-password") {
                errorMessage = "Senha incorreta. Tente novamente.";
            } else if (err.code === "auth/invalid-email") {
                errorMessage = "Email inválido. Verifique o formato do email.";
            }

            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fbbf7a]">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#0c1c24]">Entrar</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c1c24]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c1c24]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="bg-[#0c1c24] text-white font-semibold py-2 rounded hover:bg-[#1a3c4e] transition"
                    >
                        Entrar
                    </button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="mt-4 text-center">
                    <Link href="/register" className="text-[#0c1c24] hover:underline">
                        Não tem conta? Cadastre-se
                    </Link>
                </div>
            </div>
        </div>
    );
}