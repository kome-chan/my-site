"use client";

import dynamic from "next/dynamic";

const SekihiViewer = dynamic(() => import("@/components/SekihiViewer"), {
  ssr: false,
});

export default function SekihiSection() {
  return (
    <div className="mb-16">
      <div className="h-[450px] w-full">
        <SekihiViewer />
      </div>
      <p className="mt-3 text-center text-xs tracking-[0.3em] text-accent/70">
        和田町会の歴史を見守る石碑
      </p>
    </div>
  );
}
