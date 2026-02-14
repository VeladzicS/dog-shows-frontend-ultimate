"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Header />
        <main>
            {children}
        </main>
      <Footer />
    </LazyMotion>
  );
}
