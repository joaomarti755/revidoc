"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "./lib/firebaseauth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="font-sans min-h-screen p-0 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full items-center h-screen">
        <div className="relative w-full h-full min-h-screen mr-8 shadow-[0px_-8px_16px_0px_rgba(0,0,0,0.15),8px_0px_16px_0px_rgba(0,0,0,0.15),0px_8px_16px_0px_rgba(0,0,0,0.15)]">
          <Image
            src="/img/background.png"
            alt="Logo ReviDoc"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-center items-start ml-8 px-8">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo ao ReviDoc</h1>
          <p className="text-lg text-gray-700 mb-6">
            A REVIDOC é uma plataforma que analisa imagens de parafusos e calcula o percentual de corrosão com precisão. Unimos tecnologia e simplicidade para ajudar empresas a manterem segurança, confiabilidade e eficiência em seus processos.
          </p>

          {/* Botão "Analisar" aparece somente quando o usuário estiver logado */}
          {user ? (
            <Link href="/analysis">
              <button className="px-6 py-3 bg-[#1a3340] text-white rounded-md hover:bg-[#20405a] transition">
                Analisar
              </button>
            </Link>
          ) : (
            <div className="text-sm text-gray-500">
              Faça login para acessar a página de análise.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}