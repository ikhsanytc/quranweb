"use client";

import { getFirstNWords, getHalfOfText } from "@/lib/main";
import { QuranDatum } from "@/types/main";
import { Amiri } from "next/font/google";
import Link from "next/link";
import { FC } from "react";

interface Props {
  quranData: QuranDatum;
}

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});

const CardHome: FC<Props> = ({ quranData }) => {
  return (
    <Link href={`/surat/${quranData.namaLatin}/${quranData.nomor}`}>
      <div className="bg-gray-800 active:bg-gray-700 w-full lg:w-1/2 p-3 rounded-lg shadow mx-auto flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <img src="bulat.png" width={36} alt="" className="" />
            <span className="absolute inset-0 flex items-center text-xs font-medium justify-center">
              {quranData.nomor}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold">{quranData.namaLatin}</h1>
            <div className="text-xs flex items-center gap-2 text-gray-400">
              <p>{quranData.tempatTurun}</p>
              <div className="bg-gray-400 w-2 h-2 rounded-full"></div>
              <p>{quranData.jumlahAyat} Ayat</p>
            </div>
          </div>
        </div>
        <p
          className={`${amiri.className} leading-relaxed font-semibold text-lg text-purple-600`}
        >
          {quranData.nama}
        </p>
      </div>
    </Link>
  );
};

export default CardHome;
