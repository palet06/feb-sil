import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CancelTeklif from "@/app/components/CancelTeklif";
import { getOfferRequestList } from "../serveractions/actions";
import { OfferRequest } from "@prisma/client";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  let offerRequestList: any = [];
  if (user?.id) {
    offerRequestList = await getOfferRequestList(user.id);
  }

  return (
    <section className="min-h-[80vh]">
      <div className="container mx-auto py-8 h-full">
        <h3 className="h3 font-bold mb-12 border-b pb-4 text-center lg:text-left">
          Tekliflerim
        </h3>
        <div className="flex flex-col gap-8 h-full">
          {offerRequestList?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <p className="text-xl text-center text-secondary/70 mb-4">
                Herhangi bir teklifiniz yok.
              </p>
              {
                <Link href="/">
                  <Button size="md">Anasayfa</Button>
                </Link>
              }
            </div>
          ) : (
            offerRequestList.map((offer: any) => {
              return (
                <div key={offer.id} className="bg-tertiary py-8 px-12 ">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <h3 className="text-2xl font-medium w-[200px] text-center lg:text-left">
                      {offer.insuranceItself!.title!}
                    </h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-accent font-bold tracking-[1px]">
                          Teklif başvuru tarihi:
                        </span>
                        <span className=" text-secondary font-semibold">
                          {format(offer.createdAt!, "dd.MM.yyyy")}
                          <span>
                            {" - "}
                            {format(offer.createdAt!, "HH:mm")}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-accent font-bold tracking-[2px]">
                          Durum:
                        </span>
                        <span className="text-secondary font-semibold">
                          Size özel poliçe teklifi oluşturuluyor.
                        </span>
                      </div>
                    </div>
                    <CancelTeklif offer={offer} user={user!} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
