import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 sm:p-20 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl items-center">
        <div className="flex justify-center">
          <Image src="/app/img/logo.png" alt="Logo" width={350} height={350} className="object-contain" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo ao ReviDoc</h1>
          <p className="text-lg text-gray-700">A REVIDOC é uma plataforma que analisa imagens de parafusos e calcula o percentual de corrosão com precisão. Unimos tecnologia e simplicidade para ajudar empresas a manterem segurança, confiabilidade e eficiência em seus processos.</p>
        </div>
      </div>
    </div>
  );
}
