import Teklifler from "@/app/components/Teklifler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Separator } from "@/app/components/ui/separator";
import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { insuranceSingle } from "@/app/serveractions/actions";

export const revalidate = 86400; // veritabanında yaptığın değişiklikler 24 saat sonra güncellenir

const HizmetlerDetail = async ({ params }: { params: any }) => {
  const insurance = await insuranceSingle(Number(params.id));
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  const imgURL = `http://localhost:3000${insurance?.image}`;
  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row lg:gap-12 h-full">
          <div className="flex-1 ">
            <div className="relative h-[360px] lg:h-[420px] mb-8">
              <Image src={imgURL} alt="" fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-1 text-accent items-center">
                <div className="text-black">Popülerite:</div>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
            </div>
            <div className="flex flex-1 flex-col mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="h3 font-bold">{insurance?.title}</h3>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="h3 font-secondary  text-secondary">
                  {insurance?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:max-w-[360px] h-max">
            <Teklifler
              hizmet={insurance!}
              isUserAuthenticated={isUserAuthenticated}
              userData={user!}
            />
          </div>
        </div>

        <div className="flex flex-col mt-10 mb-10 space-y-12 md:space-y-0 md:flex-row text-lg">
          <div className="flex flex-col space-y-12 md:w-1/2 pr-7">
            <h3 className="h3 font-bold text-center md:text-left">
              {insurance?.h1}
            </h3>
            <p className="font-secondary  ">{insurance?.subh1}</p>
          </div>
          <div className="flex flex-col space-y-8 md:w-1/2 ">
            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full  md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-white rounded-full md:py-1 bg-accent">
                    01
                  </div>
                  <h3 className="h3 font-bold md:mb-4 md:hidden">
                    {insurance?.numberoneh1}
                  </h3>
                </div>
              </div>
              <div>
                <h3 className="hidden h3 mb-4 font-bold md:block">
                  {insurance?.numberoneh1}
                </h3>
                <p className="font-secondary">{insurance?.numberonesub}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-white rounded-full md:py-1 bg-accent">
                    02
                  </div>
                  <h3 className="h3 font-bold md:mb-4 md:hidden">
                    {insurance?.numbertwoh1}
                  </h3>
                </div>
              </div>
              <div className="">
                <h3 className="hidden h3 mb-4 font-bold md:block">
                  {insurance?.numbertwoh1}
                </h3>
                <p className="font-secondary">{insurance?.numbertwosub}</p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
              <div className="rounded-l-full md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="px-4 py-2 text-white rounded-full md:py-1 bg-accent">
                    03
                  </div>
                  <h3 className="h3 font-bold md:mb-4 md:hidden">
                    {insurance?.numberthreeh1}
                  </h3>
                </div>
              </div>
              <div className="">
                {" "}
                <h3 className="hidden h3 mb-4 font-bold md:block">
                  {insurance?.numberthreeh1}
                </h3>
                <p className="font-secondary">{insurance?.numberthreesub}</p>
              </div>
            </div>
          </div>
        </div>
        <Separator />

        <div className="max-auto mt-20 mb-10 text-center md:text-left ">
          <h3 className="h3 font-bold w-full text-center">
            Akla Gelen Birkaç Soru ve Cevapları
          </h3>

          <div className="mt-12 md:w-3/4 md:mx-auto w-full">
            <Accordion className="text-lg" type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-secondary font-bold text-lg text-left md:text-left">
                  {insurance?.q1}
                </AccordionTrigger>
                <AccordionContent className="font-secondary text-lg text-left md:text-left">
                  {insurance?.a1}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-secondary font-bold text-lg  text-left md:text-left">
                  {insurance?.q2}
                </AccordionTrigger>
                <AccordionContent className="font-secondary text-lg text-left md:text-left">
                  {insurance?.a2}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-secondary font-bold text-lg  text-left md:text-left">
                  {insurance?.q3}
                </AccordionTrigger>
                <AccordionContent className="font-secondary text-lg text-left md:text-left">
                  {insurance?.a3}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HizmetlerDetail;
