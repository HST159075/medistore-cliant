"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

import { authClient } from "@/lib/auth.client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
     
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: () => setLoading(true),
          onResponse: () => setLoading(false),
          onError: (ctx) => {
            alert(ctx.error.message || "Invalid credentials");
          },
          onSuccess: async () => {
            const { data: sessionData } = await authClient.getSession();
            const user = sessionData?.user;

            const userRole =
              user && "role" in user
                ? (user.role as string).toUpperCase()
                : "CUSTOMER";

            if (userRole === "ADMIN") {
              router.push("/admin-dashboard");
            } else if (userRole === "SELLER") {
              router.push("/seller-dashboard");
            } else {
              router.push("/dashboard");
            }

            router.refresh();
          },
        },
      );
    } catch (err) {
      setLoading(false);
      console.error("Fetch error details:", err);
      alert(
        " Baseurl error",
      );
    }
  }

  return (
    <Card className="mx-auto max-w-sm shadow-xl border-none p-4">
      <CardHeader>
        <CardTitle className="text-3xl font-black text-center text-blue-600">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      {...field}
                      disabled={loading}
                      className="h-12 rounded-xl border-gray-200 focus:ring-blue-600 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="font-bold">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={loading}
                      className="h-12 rounded-xl border-gray-200 focus:ring-blue-600 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Verifying...
                </span>
              ) : (
                "Login to Account"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/Register"
            className="underline font-bold text-blue-600 hover:text-blue-800"
          >
            Create an Account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
