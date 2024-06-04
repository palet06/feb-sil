import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="h-[60vh] lg:h-[80vh] bg-hero bg-center bg-cover bg-no-repeat">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="h1 text-white text-center max-w-[800px] mb-8">
            Geleceğe güvenle <br />
            adım atın
          </h1>
          <Link href="#hizmetler">
            <Button size="lg">Daha fazlasını keşfet</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
