"use client";
import Container from "@/components/container";
import Navbar from "@/components/ui/navbar";
import { QuranDataLengkap, QuranLengkap } from "@/types/main";
import { useEffect, useRef, useState } from "react";
import feather from "feather-icons";
import Bismillah from "@/app/assets/Bismillah";
import { Amiri } from "next/font/google";
import { Tooltip } from "react-tooltip";
import { checkUser, supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { lastReadType } from "@/types/database";

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
});
export default function Page({
  params,
}: {
  params: { namaSurat: string; no: number };
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [quranData, setQuranData] = useState<QuranDataLengkap>();
  const [userData, setUserData] = useState<User>();
  const [srcAudio, setSrcAudio] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [whichAudio, setWhichAudio] = useState<number>();
  async function getDataSurahDetail() {
    const res = await fetch(`https://equran.id/api/v2/surat/${params.no}`);
    const data: QuranLengkap = await res.json();
    setQuranData(data.data);
  }
  useEffect(() => {
    getDataSurahDetail();
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = srcAudio;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [srcAudio]);
  useEffect(() => {
    checkUser().then(async (user) => {
      if (user) {
        setUserData(user);
        try {
          const { error, data } = await supabase
            .from("last_read")
            .select()
            .eq("userId", user.id)
            .eq("surat", params.namaSurat)
            .maybeSingle();
          if (error) {
            toast.error(error.message);
            return;
          }
          if (data) {
            const lastRead = data as lastReadType;
            window.scrollTo({
              top: parseInt(lastRead.scrollY, 10),
              behavior: "smooth",
            });
            toast.success("Sukses me-load posisi sebelumnya!");
          }
        } catch (err) {
          console.error(err);
          toast.error("unexpected error!");
        }
      }
    });
  }, []);
  function handlePausePlay(src: string, id: number) {
    if (audioRef.current) {
      if (isPlaying) {
        setWhichAudio(undefined);
        audioRef.current.pause();
      } else {
        setSrcAudio(src);
        setWhichAudio(id);
        audioRef.current.play();
      }
    }
    setIsPlaying((prev) => !prev);
  }

  async function handleSave() {
    if (!userData) return;

    try {
      const { data, error: selectError } = await supabase
        .from("last_read")
        .select()
        .eq("userId", userData.id)
        .eq("surat", params.namaSurat);

      if (selectError) {
        toast.error(selectError.message, { theme: "dark" });
        return;
      }

      if (data?.length !== 0) {
        const confirmed = confirm(
          "Kamu yakin ingin menimpa save posisi sebelumnya?"
        );
        if (!confirmed) return;

        const { error: deleteError } = await supabase
          .from("last_read")
          .delete()
          .eq("userId", userData.id)
          .eq("surat", params.namaSurat);

        if (deleteError) {
          toast.error(deleteError.message, { theme: "dark" });
          return;
        }
      }

      const { error: insertError } = await supabase.from("last_read").insert({
        userId: userData.id,
        surat: params.namaSurat,
        scrollY: window.scrollY.toString(),
        idSurat: params.no,
      });

      if (insertError) {
        toast.error(insertError.message, { theme: "dark" });
        return;
      }

      toast.success("Sukses menyimpan", { theme: "dark" });
    } catch (err) {
      toast.error("Unexpected error", { theme: "dark" });
      console.error(err);
    }
  }

  return (
    <Container>
      <Navbar back />
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
          setWhichAudio(undefined);
        }}
      ></audio>
      {quranData ? (
        <>
          <div className="w-full lg:w-1/2 mx-auto rounded-lg shadow-2xl h-full bg-purple-600 p-3">
            <h1 className="text-center font-semibold text-2xl">
              {quranData.namaLatin}
            </h1>
            <p className="text-center mt-3 font-medium text-xl">
              {quranData.arti}
            </p>
            <hr className="mt-4 mx-24" />
            <div className="justify-center items-center flex gap-2 mt-4 font-medium">
              <p>{quranData.tempatTurun}</p>
              <div className="bg-white w-2 h-2 rounded-full"></div>
              <p>{quranData.jumlahAyat} Ayat</p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Bismillah />
            </div>
          </div>
          {quranData.ayat.map((ayat, idx) => (
            <div key={idx} className="flex flex-col gap-7 items-center">
              <div className="bg-gray-800 w-full lg:w-1/2 p-2 mx-auto mt-4 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
                    {++idx}
                  </div>
                  {whichAudio && whichAudio == idx ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => handlePausePlay(ayat.audio["01"], idx)}
                      dangerouslySetInnerHTML={{
                        __html: feather.icons["pause-circle"].toSvg(),
                      }}
                    ></div>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => handlePausePlay(ayat.audio["01"], idx)}
                      dangerouslySetInnerHTML={{
                        __html: feather.icons["play-circle"].toSvg(),
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-1/2 mx-auto mb-4">
                <p
                  className={`${amiri.className} text-xl text-right leading-relaxed py-6 tracking-wider`}
                >
                  {ayat.teksArab}
                </p>
                <p className="font-medium mb-1">{ayat.teksIndonesia}</p>
                <p className={amiri.className}>{ayat.teksLatin}</p>
              </div>
            </div>
          ))}
          {userData && (
            <button
              onClick={handleSave}
              data-tooltip-id="saveChanges"
              data-tooltip-content="Save Posisi Saat Ini!"
              className="bg-purple-600 rounded-full fixed bottom-4 right-4 p-4 cursor-pointer"
            >
              <div
                dangerouslySetInnerHTML={{ __html: feather.icons.save.toSvg() }}
              ></div>
              <Tooltip id="saveChanges" />
            </button>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner"></div>
        </div>
      )}
    </Container>
  );
}
