import React from "react";

export default function Register() {
	return (
	<div className="min-h-screen flex items-center justify-center bg-[#fbbf7a]">
			<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-[#1a3340]">Cadastrar</h2>
				<form className="flex flex-col gap-4">
					<input
						type="text"
						placeholder="Nome"
						className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
						required
					/>
					<input
						type="email"
						placeholder="E-mail"
						className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
						required
					/>
					<input
						type="password"
						placeholder="Senha"
						className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a3340]"
						required
					/>
					<button
						type="submit"
						className="bg-[#1a3340] text-white font-semibold py-2 rounded hover:bg-[#20405a] transition"
					>
						Cadastrar
					</button>
				</form>
				<div className="mt-4 text-center">
					<a href="/login" className="text-[#1a3340] hover:underline">Já tem conta? Entrar</a>
				</div>
			</div>
		</div>
	);
}
