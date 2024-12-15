// TikTok Content Generator - Next.js TypeScript
"use client";
import React, { useState } from "react";
import { toPng } from "html-to-image";

const phrases = [
  { english: "Hello", translation: "Halo" },
  { english: "Thank you", translation: "Terima kasih" },
  { english: "Good morning", translation: "Selamat pagi" },
  { english: "Good night", translation: "Selamat malam" },
  { english: "How are you?", translation: "Apa kabar?" },
  { english: "I love you", translation: "Aku cinta kamu" },
  { english: "Goodbye", translation: "Selamat tinggal" },
];

const MAX_ITEMS_PER_FRAME = 10; // Jumlah maksimal teks per frame

const splitContent = (
  phrases: { english: string; translation: string }[],
  maxItems: number
) => {
  const frames: { english: string; translation: string }[][] = [];
  for (let i = 0; i < phrases.length; i += maxItems) {
    frames.push(phrases.slice(i, i + maxItems));
  }
  return frames;
};

const TikTokContentGenerator: React.FC = () => {
  const [frames] = useState(splitContent(phrases, MAX_ITEMS_PER_FRAME));

  const handleExportAll = async () => {
    const frames = document.querySelectorAll('[id^="content-frame"]');
    frames.forEach(async (frame, index) => {
      const dataUrl = await toPng(frame as HTMLElement);
      const link = document.createElement("a");
      link.download = `tiktok-content-${index + 1}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-2xl font-bold">TikTok Content Generator</h1>
      <div className="grid grid-cols-1 gap-8">
        {frames.map((frameContent, frameIndex) => (
          <div
            key={frameIndex}
            id={`content-frame-${frameIndex}`}
            className="relative w-64 h-full aspect-[9/16] bg-cover bg-center shadow-lg rounded-lg"
            style={{ backgroundImage: "url('/Background-konten.png')" }}
          >
            <div className="absolute inset-0 flex flex-col gap-4 pl-4 mt-11">
              {frameContent.map((item, itemIndex) => (
                <div key={itemIndex} className="text-left text-white">
                  <table className="table-auto">
                    <tbody>
                      <tr>
                        <td>
                          <p className="text-lg">{item.english} :</p>
                        </td>
                        <td>
                          <p className="text-yellow-500 text-lg italic">
                            {item.translation}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleExportAll}
        className="mt-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Export
      </button>
    </div>
  );
};

export default TikTokContentGenerator;
