import { Suspense } from "react";
import { Hero } from "./components/Hero";
import Hizmetler from "./components/Hizmetler";
import Loading from "./loading";

export default async function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<Loading />}>
        <Hizmetler />
      </Suspense>
    </main>
  );
}
