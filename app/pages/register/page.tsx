"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { useAuth } from "@/app/lib/firebaseauth";
import { handleAdd } from "@/app/utils/handlecollection";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (user) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
                <h1 className="text-xl font-bold">Acesso negado</h1>
                <p className="text-gray-700 mt-2">
                    Você já está logado. Caso queira registrar uma nova conta, saia primeiro.
                </p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem.");
            return;
        }

        try {
            await handleAdd({
                nome: username,
                email: email,
                senha: password,
            });
            toast.success("Usuário registrado com sucesso!");
            router.push("/analysis");
        } catch (err) {
            console.error("Erro ao registrar o usuário:", err);
            toast.error("Erro ao registrar o usuário. Tente novamente.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fbbf7a]">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-[#1a3340]">Cadastrar</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirme a senha"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-[#1a3340] text-white font-semibold py-2 rounded hover:bg-[#20405a] transition"
                    >
                        Cadastrar
                    </button>
                </form>
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="mt-4 text-center">
                    <Link href="/login" className="text-[#1a3340] hover:underline">
                        Já tem conta? Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}