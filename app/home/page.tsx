"use client";
import Container from "@/components/container";
import CardHome from "@/components/Home/card";
import Navbar from "@/components/ui/navbar";
import { Quran, QuranDatum } from "@/types/main";
import React, { useEffect, useState } from "react";
import { icons } from "feather-icons";
import { checkUser, supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import { lastReadType } from "@/types/database";
import { useRouter } from "next/navigation";

const Page = () => {
  const [quranData, setQuranData] = useState<QuranDatum[]>();
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const [lastReadData, setLastReadData] = useState<lastReadType>();
  async function getDataQuran() {
    try {
      const res = await fetch("/surat.json");
      const data: Quran = await res.json();
      setQuranData(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Error", {
        theme: "dark",
      });
    }
  }
  useEffect(() => {
    getDataQuran();
    checkUser().then(async (user) => {
      if (user) {
        setIsLogin(true);
        const { error, data } = await supabase
          .from("last_read")
          .select()
          .eq("userId", user.id)
          .order("created_at", { ascending: false });
        if (error) {
          toast.error(error.message);
          return;
        }
        setLastReadData(data.at(0));
      }
    });
  }, []);
  function handleClickLastRead() {
    if (!isLogin) {
      toast.warning("Login terlebih dahulu!");
      return;
    }
    if (!lastReadData) {
      toast.error("Tidak ada data posisi sebelumnya!");
      return;
    }
    router.push(`/surat/${lastReadData.surat}/${lastReadData.idSurat}`);
  }
  // console.log(lastReadData);
  return (
    <Container>
      <Navbar />

      <div
        onClick={handleClickLastRead}
        className="w-full lg:w-1/2 bg-purple-600 cursor-pointer h-40 rounded-2xl mb-5 mx-auto flex justify-between"
      >
        <div className="p-6">
          <div className="md:text-xl font-semibold flex gap-4 items-center text-nowrap">
            <h1>Last Read</h1>
            <div
              dangerouslySetInnerHTML={{ __html: icons["book-open"].toSvg() }}
            ></div>
          </div>
          <div
            className={`mt-5 font-semibold ${isLogin ? "text-lg" : "text-sm"}`}
          >
            {isLogin
              ? lastReadData
                ? decodeURIComponent(lastReadData.surat)
                : "Loading..."
              : "Login Untuk Dapat Fitur Ini"}
          </div>
        </div>
        <div className="my-[60px] ml-auto">
          <img src="/quran2.png" className="h-24" alt="" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {quranData ? (
          quranData.map((quran, idx) => (
            <CardHome quranData={quran} key={idx} />
          ))
        ) : (
          <div className="flex justify-center items-center mt-10">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
