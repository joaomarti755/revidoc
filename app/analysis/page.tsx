"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/app/lib/firebaseauth";

export default function Analysis() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [corrosionResult, setCorrosionResult] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Camera states
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      toast.error("Você precisa estar logado para acessar esta página");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImageSelection(file);
  };

  const handleImageSelection = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => setSelectedImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResultImage(null);
    setCorrosionResult("");
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleImageSelection(e.target.files[0]);
  };

  // Abrir câmera e mostrar vídeo
  const handleCameraCapture = async () => {
    setSelectedImage(null);
    setResultImage(null);
    setCorrosionResult("");
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      toast.error("Erro ao acessar a câmera");
    }
  };

  // Capturar foto do vídeo
  const handleTakePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setSelectedImage(dataUrl);
      setShowCamera(false);
      setResultImage(null);
      setCorrosionResult("");
      // Parar o stream da câmera
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    try {
      const mimeType = selectedImage.startsWith("data:image/png") ? "image/png" : "image/jpeg";
      const base64Response = await fetch(selectedImage);
      const blob = await base64Response.blob();
      const file = new File([blob], "image", { type: mimeType });

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/analisar", {
        method: "POST",
        body: formData,
        headers: {
          "accept": "application/json",
        },
      });

      if (!response.ok) throw new Error("Erro na resposta da API");

      // Percentual do header
      const percentualHeader = response.headers.get("x-corrosao-percentual");
      setCorrosionResult(percentualHeader ? `Corrosão detectada: ${percentualHeader}%` : "Percentual não encontrado");

      // Imagem do corpo da resposta
      const resultBlob = await response.blob();
      const resultImageUrl = URL.createObjectURL(resultBlob);
      setResultImage(resultImageUrl);

      toast.success("Análise concluída com sucesso!");
    } catch (error) {
      console.error("Erro na análise:", error);
      toast.error("Erro ao analisar a imagem. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen p-0 flex items-center justify-center bg-[#fbbf7a]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-screen p-8">
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
          <div
            className={`w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center p-4 mb-4 ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ position: "relative", background: "#fafafa" }}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                  margin: "auto",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : showCamera ? (
              <div className="flex flex-col items-center w-full h-full justify-center">
                <video
                  ref={videoRef}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "#222",
                  }}
                />
                <button
                  onClick={handleTakePhoto}
                  className="mt-2 px-4 py-2 bg-[#1a3340] text-white rounded hover:bg-[#20405a]"
                >
                  Tirar Foto
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500">Arraste uma imagem ou</p>
                <input type="file" ref={fileInputRef} onChange={handleFileInput} accept="image/*" className="hidden" />
                <button onClick={() => fileInputRef.current?.click()} className="mt-2 px-4 py-2 bg-[#1a3340] text-white rounded hover:bg-[#20405a]">
                  Selecione um arquivo
                </button>
              </div>
            )}
          </div>
          {!showCamera && (
            <button
              onClick={handleCameraCapture}
              className="w-full px-4 py-2 bg-[#1a3340] text-white rounded hover:bg-[#20405a] mb-4"
            >
              {selectedImage ? "Tirar outra foto" : "Usar Câmera"}
            </button>
          )}
          <button
            onClick={handleAnalyze}
            disabled={!selectedImage}
            className={`w-full px-4 py-2 text-white rounded ${selectedImage ? "bg-[#1a3340] hover:bg-[#20405a]" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Analisar Imagem
          </button>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg">
          {corrosionResult && <p className="text-xl font-bold mb-4 text-center">{corrosionResult}</p>}
          {resultImage ? (
            <img src={resultImage} alt="Resultado da análise" className="max-w-full max-h-[500px] object-contain" />
          ) : (
            <div className="text-center text-gray-500">
              <p>Os resultados da análise aparecerão aqui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}