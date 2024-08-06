"use client";
import Container from "@/components/container";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  }, [router]);
  return (
    <Container center column>
      <motion.img
        initial={{ opacity: 0, y: 440 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        src="/quran.png"
        className="w-64"
        alt=""
      />
      <div className="p-2"></div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-3xl mb-1 font-bold"
      >
        Quran Web
      </motion.h1>
    </Container>
  );
};

export default Page;
