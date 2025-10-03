import React from "react";

export default function Login() {
	return (
	<div className="min-h-screen flex items-center justify-center bg-[#fbbf7a]">
			<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center text-[#0c1c24]">Entrar</h2>
				<form className="flex flex-col gap-4">
					<input
						type="email"
						placeholder="E-mail"
						className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c1c24]"
						required
					/>
					<input
						type="password"
						placeholder="Senha"
						className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0c1c24]"
						required
					/>
					<button
						type="submit"
						className="bg-[#0c1c24] text-white font-semibold py-2 rounded hover:bg-[#1a3c4e] transition"
					>
						Entrar
					</button>
				</form>
				<div className="mt-4 text-center">
					<a href="/register" className="text-[#0c1c24] hover:underline">Não tem conta? Cadastre-se</a>
				</div>
			</div>
		</div>
	);
}
