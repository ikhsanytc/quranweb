"use client";
import Container from "@/components/container";
import Button from "@/components/ui/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "@/components/ui/input";
import { checkUser, supabase } from "@/lib/supabase";
import { LoginT } from "@/types/main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginT>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const login: SubmitHandler<LoginT> = async (dataForm) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: dataForm.email,
        password: dataForm.password,
      });
      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      toast.success("Sukses login, selamat datang!");
      router.push("/home");
    } catch (err) {
      setLoading(false);
      console.error(err);
      toast.error("unexpected error!");
    }
  };
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((state) => {
      if (state === "SIGNED_IN") {
        router.push("/home");
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    checkUser().then((user) => {
      if (user) {
        toast.warning("Kamu sudah login!");
        router.push("/home");
        return;
      }
      setLoading(false);
    });
  }, []);
  return (
    <Container center>
      <Card>
        <form onSubmit={handleSubmit(login)}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              <Input
                label="Email"
                placeholder="example123@example.com"
                error={errors.email?.message}
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please enter the email!",
                  },
                })}
              />
              <Input
                label="Password"
                placeholder="example123321@*"
                error={errors.password?.message}
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter the password!",
                  },
                })}
              />
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex justify-between">
              <Button
                type="submit"
                size="small"
                disabled={loading ? true : undefined}
              >
                Login
              </Button>
              <div className="flex gap-2">
                <Link href="/register">
                  <Button type="button" size="small" styleButton="secondary">
                    Register
                  </Button>
                </Link>

                <Button
                  type="button"
                  size="small"
                  styleButton="secondary"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
