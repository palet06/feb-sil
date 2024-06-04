"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { OfferRequest } from "@prisma/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { deleteOfferRequest } from "../serveractions/actions";

// const deleteData = async (url: string) => {
//   const options = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     next: {
//       revalidate: 0,
//     },
//   };
//   try {
//     const res = await fetch(url, options);
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteOffReq = async (offerId: number) => {
  await deleteOfferRequest(offerId);
};
const CancelTeklif = ({
  offer,
  user,
}: {
  offer: OfferRequest;
  user: KindeUser;
}) => {
  const silGitsin = (id: number) => {
    deleteOffReq(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="md">Teklifi iptal et</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Teklifinizi iptal etmek istediğinize emin misiniz?
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col">
            Bu teklif için oluşturulan tüm poliçeler de silinecektir.
            <p className="text-red-500">Bu eylem geri alınamaz!</p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          <AlertDialogAction onClick={() => silGitsin(offer.id)}>
            Onayla
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelTeklif;
