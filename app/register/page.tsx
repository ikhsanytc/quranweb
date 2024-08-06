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
import { RegisterT } from "@/types/main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterT>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const registerr: SubmitHandler<RegisterT> = async (dataForm) => {
    setLoading(true);
    toast("Tunggu Sebentar...", { delay: 1000, toastId: 10092 });
    if (dataForm.confirmPassword !== dataForm.password) {
      setError("confirmPassword", {
        message: "Password not same!",
      });
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email: dataForm.email,
        password: dataForm.password,
      });
      if (error) {
        setLoading(false);
        toast.error(error.message);
        return;
      }
      toast.success("Check you're email to verify!");
      router.push("/login");
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };
  useEffect(() => {
    checkUser().then((user) => {
      if (user) {
        toast.warning("Kamu sudah register!");
        router.push("/home");
        return;
      }
      setLoading(false);
    });
  }, []);
  return (
    <Container center>
      <Card>
        <form onSubmit={handleSubmit(registerr)}>
          <CardHeader>
            <CardTitle>Register</CardTitle>
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
              <Input
                label="Confirm Password"
                placeholder="example123321@*"
                error={errors.confirmPassword?.message}
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Please confirm you're password!",
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
                Register
              </Button>
              <div className="flex gap-2">
                <Link href="/login">
                  <Button type="button" size="small" styleButton="secondary">
                    Login
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

export default Register;
