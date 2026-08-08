"use client";

import { useRouter } from "next/navigation";
import { guestLogin } from "../../lib/api";
import { Button } from "../../components/ui/Button";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function continueAsGuest() {
    setLoading(true);
    try {
      const result = await guestLogin();
      localStorage.setItem("user", JSON.stringify(result.user));
      router.push("/tasks");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-950">
      <div className="w-full max-w-[280px]">
        <div className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-neutral-900 text-white">
            ▲
          </div>
          Pyramid
        </div>

        <div className="rounded-[18px] border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-center text-[15px] font-semibold">
            Let&apos;s get back on track
          </h1>
          <p className="mt-1 text-center text-[11px] text-neutral-500">
            Enter your email below to login to your account.
          </p>

          <Button
            className="mt-4 w-full rounded-full py-2 text-xs"
            onClick={continueAsGuest}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue as Guest"}
          </Button>

          <button
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 py-2 text-xs hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            onClick={() => alert("Google OAuth can be connected here.")}
          >
            <span className="font-bold">G</span>
            Login with Google
          </button>
        </div>

        <p className="mx-auto mt-4 max-w-[190px] text-center text-[9px] leading-3 text-neutral-500">
          By clicking continue, you agree to our{" "}
          <u>Terms of Service</u> and <u>Privacy Policy</u>.
        </p>
      </div>
    </main>
  );
}
