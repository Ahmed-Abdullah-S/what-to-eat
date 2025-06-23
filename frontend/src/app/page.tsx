"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check for token in localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
