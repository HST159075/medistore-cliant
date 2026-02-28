"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

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

type UserWithRole = {
  role?: string;
} & Record<string, unknown>;

const loginSchema = z.object({
  email: z.string().email("একটি সঠিক ইমেইল ঠিকানা দিন"),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
});

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session } = authClient.useSession();
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    try {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: async (ctx) => {
            const user = ctx.data?.user as UserWithRole;
            const userRole = user?.role?.toUpperCase() || "CUSTOMER";

            const destinationPath =
              userRole === "ADMIN"
                ? "/admin-dashboard"
                : userRole === "SELLER"
                ? "/seller-dashboard"
                : "/dashboard/customer";

            setRedirectTo(destinationPath);
            setLoading(false);
            window.location.assign(destinationPath);
          },
          onError: (ctx) => {
            setLoading(false);
            alert(ctx.error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
          },
        }
      );
    } catch (err: unknown) {
      setLoading(false);
      console.error("Submission error:", err);
    }
  }

  useEffect(() => {
    if (!redirectTo) return;
    if (session) {
      router.push(redirectTo);
      return;
    }
    const t = setTimeout(() => {
      window.location.href = redirectTo;
    }, 1500);
    return () => clearTimeout(t);
  }, [redirectTo, session, router]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-sm overflow-hidden">
        <div className="h-1.5 w-full bg-linear-to-r from-blue-400 via-blue-600 to-indigo-600" />

        <CardHeader className="space-y-1 pb-6 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-gray-900">
            Welcome <span className="text-blue-600">Back</span>
          </CardTitle>
          <CardDescription className="text-gray-500 font-medium">
            আপনার ড্যাশবোর্ড এক্সেস করতে লগইন করুন
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold text-sm">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          placeholder="name@example.com"
                          className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-lg text-black"
                          {...field}
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 font-semibold text-sm">Password</FormLabel>
                      <Link href="#" className="text-xs text-blue-600 hover:underline font-medium">Forgot?</Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 h-11 bg-gray-50/50 border-gray-200 focus:bg-white transition-all rounded-lg text-black"
                          {...field}
                          disabled={loading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-blue-200 group"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </Form>

         

          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-2 text-gray-400 font-medium">Protected by MediStore Secure</span>
            </div>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-500">Don&apos;t have an account? </span>
            <Link href="/Register" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Sign up now</Link>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
        &copy; 2026 MediStore &bull; Digital Pharmacy
      </p>
    </div>
  );
}