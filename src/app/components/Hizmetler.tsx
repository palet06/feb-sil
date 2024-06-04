import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import HizmetlerListesi from "./HizmetlerListesi";
import { Insurance } from "@prisma/client";
import { insuranceListAll } from "../serveractions/actions";
import { Suspense } from "react";
import Loading from "../loading";

const Hizmetler = async () => {
  const insuranceList = await insuranceListAll();

  return (
    <section>
      <div id="hizmetler" className="container mx-auto">
        <HizmetlerListesi insuranceList={insuranceList as Insurance[]} />
      </div>
    </section>
  );
};

export default Hizmetler;
