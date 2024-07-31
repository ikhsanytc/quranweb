"use client";
import { checkUser, supabase } from "@/lib/supabase";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import feather from "feather-icons";
import { useRouter } from "next/navigation";
import { LinkNavbar } from "@/types/main";

interface Props {
  back?: boolean;
}

const Navbar: FC<Props> = ({ back }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const links: LinkNavbar[] = [
    {
      display: "Home",
      path: "/home",
    },
  ];
  useEffect(() => {
    checkUser().then((user) => {
      if (user) {
        setIsLogin(true);
      }
    });
  }, []);
  function clickOutside(e: MouseEvent) {
    if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
      setDrawerOpen(false);
      document.body.classList.remove("overflow-hidden");
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);
  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <>
      <div className="fixed top-0 inset-x-0 w-full bg-gray-900 shadow bg-opacity-80 backdrop-filter backdrop-blur z-40">
        <div className="h-14 flex items-center px-4 justify-between">
          <div className="flex gap-2 items-center">
            {back && (
              <div
                className="cursor-pointer"
                onClick={() => router.back()}
                dangerouslySetInnerHTML={{
                  __html: feather.icons["arrow-left"].toSvg(),
                }}
              ></div>
            )}
            <Link href="/home">
              <h1 className="font-bold text-3xl">
                <span className="text-yellow-500">Quran</span> Web
              </h1>
            </Link>
          </div>
          <div className="lg:flex items-center gap-7 hidden">
            {links.map((link, idx) => (
              <Link
                href={link.path}
                key={idx}
                className="font-semibold hover:border-b-2 hover:border-blue-500"
              >
                {link.display}
              </Link>
            ))}
            {!isLogin ? (
              <Link
                href="/login"
                className="font-semibold hover:border-b-2 hover:border-blue-500"
              >
                Login
              </Link>
            ) : (
              <a
                onClick={logout}
                className="font-semibold cursor-pointer hover:border-b-2 hover:border-blue-500"
              >
                Logout
              </a>
            )}
          </div>
          <div
            className="lg:hidden"
            dangerouslySetInnerHTML={{ __html: feather.icons.menu.toSvg() }}
            onClick={() => {
              setDrawerOpen(true);
              document.body.classList.add("overflow-hidden");
            }}
          ></div>
        </div>
      </div>
      <div
        className={`bg-gray-800 z-50 -inset-y-0 -inset-x-0 bg-opacity-90 backdrop-filter backdrop-blur fixed ${
          drawerOpen ? "w-64" : "w-0 opacity-0 pointer-events-none"
        } p-3 transition-all duration-300 ease-in-out`}
        ref={drawerRef}
      >
        <h1 className="text-xl font-semibold mb-2">
          <span className="text-yellow-500">Quran</span> Web
        </h1>
        <hr />
        <div className="mt-5 flex text-center">
          {links.map((link, idx) => (
            <Link
              href={link.path}
              key={idx}
              className="bg-purple-600 py-2 rounded-lg shadow w-full focus:ring transition duration-150 hover:bg-purple-700 active:bg-purple-500"
            >
              {link.display}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-14"></div>
    </>
  );
};

export default Navbar;
