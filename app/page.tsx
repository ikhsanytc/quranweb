"use client";
import Container from "@/components/container";
import Button from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const Page = () => {
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
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="font-semibold mb-2"
      >
        <span className="text-purple-700">Learn</span>{" "}
        <span className="text-yellow-500">Quran</span> and{" "}
        <span className="text-blue-500">Recite</span> once{" "}
        <span className="text-red-600">everyday!</span>
      </motion.p>
      <Link href="/home">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          <Button>Get started!</Button>
        </motion.div>
      </Link>
    </Container>
  );
};

export default Page;
