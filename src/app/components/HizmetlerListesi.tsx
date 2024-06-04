"use client";
import Link from "next/link";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { Insurance } from "@prisma/client";

const HizmetlerListesi = ({
  insuranceList,
}: {
  insuranceList: Insurance[];
}) => {
  return (
    <section className="py-16 min-h-[90vh]">
      <div className="flex flex-col items-center">
        {/* <div className="relative w-[82px] h-[80px]">
          <Image src="/assets/logo.png" fill alt="" className="object-cover" />
        </div> */}
        <h3 className="h2 mb-8 text-[#363F4D]">Hizmetlerimiz</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {insuranceList.map((hizmet) => {
          const imgURL = `http://localhost:3000${hizmet.image}`;
          return (
            <div key={hizmet.id}>
              <Link href={`/insurance/${hizmet.id}`}>
                <div className="rounded-md relative w-full h-[300px] overflow-hidden mb-6">
                  <Image
                    src={imgURL}
                    fill
                    priority
                    alt="hizmet resmi"
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="h-[334px]">
                <div className="flex items-center justify-between mb-6">
                  <div>Popülerite:</div>
                  <div className="flex gap-1 text-accent">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalf />
                  </div>
                </div>
                <Link href={`/insurance/${hizmet.id}`}>
                  <h3 className="h3">{hizmet.title}</h3>
                </Link>
                <p className="h3 font-secondary text-base text-gray-600 mb-4 line-clamp-4">
                  {hizmet.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HizmetlerListesi;
