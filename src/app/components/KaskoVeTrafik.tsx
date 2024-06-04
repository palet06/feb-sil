import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { createOfferRequest } from "../serveractions/actions";
import { Button } from "./ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import AlertMessage from "./AlertMessage";
import { InputMask } from "@react-input/mask";
import { useRouter } from "next/navigation";

const KaskoVeTrafik = ({
  hizmet,
  isUserAuthenticated,
  userData,
}: {
  hizmet: any;
  isUserAuthenticated: any;
  userData: KindeUser;
}) => {
  const router = useRouter();
  const [tcKimlik, setTcKimlik] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [platenumber, setPlatenumber] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>();
  const [registrationumber, setRegistrationumber] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<{
    message: string[];
    type: "error" | "success" | null;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage(null);
      if (alertMessage?.type === "success") {
        router.push("/dashboard");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [alertMessage, router]);

  const handleDate = (date: Date) => {
    setDate(new Date(date));
  };
  const handleTc = (e: string) => {
    setTcKimlik(e);
  };
  const handlePlatenumber = (e: string) => {
    setPlatenumber((a) => e);
  };
  const handleRegistrationumber = (e: string) => {
    setRegistrationumber((a) => e);
  };
  const handlePhonenumber = (e: string) => {
    var str = e.replace(/[- )(]/g, "");
    setPhonenumber(str);
  };

  let zErrList: any[] = [];
  const pregnancyObj = z.object({
    tc: z
      .string()
      .min(11, {
        message:
          "T.C kimlik / Yabancı Kimlik numaranız en az 11 karakter uzunluğunda olmalı",
      })
      .max(11, {
        message:
          "T.C kimlik / Yabancı Kimlik numaranız en fazle 11 karakter uzunluğunda olmalı",
      }),
    birthdate: z.date({ required_error: "Lütfen doğum tarihinizi belirtin" }),
    platenumber: z
      .string()
      .min(7, {
        message: "Plaka numarası 7 karakter uzunluğunda olmalı",
      })
      .max(8, {
        message: "Plaka numarası en fazla 7 karakter uzunluğunda olmalı",
      }),
    phonenumber: z
      .string({
        message: "Lütfen telefon numaranızı belirtin",
      })
      .min(10, {
        message: "Eksik ya da hatalı telefon numarası",
      }),

    registrationumber: z
      .string()
      .min(6, {
        message: "Tescil numarası 6 karakter uzunluğunda olmalı",
      })
      .max(6, {
        message: "Tescil numarası en fazla 6 karakter uzunluğunda olmalı",
      }),
  });
  const saveOfferRequest = async () => {
    let validateObj = {
      tc: tcKimlik,
      birthdate: date,
      phonenumber: phonenumber,
      platenumber: platenumber,

      registrationumber: registrationumber,
    };
    const validate = pregnancyObj.safeParse(validateObj);
    zErrList = [];
    if (!validate.success) {
      validate.error.errors.map((e) => zErrList.push(e.message));
      setAlertMessage({
        message: zErrList.slice(),
        type: "error",
      });
    } else {
      const offerRequest: Prisma.OfferRequestCreateInput = {
        tc: tcKimlik.toString(),
        birthdate: date!,
        pregnancy: undefined!,
        weight: undefined,
        height: undefined,
        phonenumber: phonenumber,
        platenumber: platenumber,
        registrationumber: registrationumber,
        address: undefined,
        whereto: undefined,
        trippolicydates: undefined,
        tripstartdate: undefined,
        tripenddate: undefined,
        homestatus: undefined,
        surfacearea: undefined,
        apartmentage: undefined,
        vacancyperiod: undefined,
        risklocated: undefined,
        isWaiting: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        insuranceItself: {
          create: undefined,
          connectOrCreate: undefined,
          connect: {
            id: hizmet.id,
          },
        },
        userItself: {
          create: undefined,
          connectOrCreate: undefined,
          connect: {
            kindeUserId: userData.id,
          },
        },
      };

      await createOfferRequest(offerRequest);

      setAlertMessage({
        message: [
          "Teklif talebinizi aldık. En kısa zamanda sizi bilgilendireceğiz.",
        ],
        type: "success",
      });
      //router.refresh();
    }
  };
  return (
    <>
      <input
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        id="tcKimlik"
        type="number"
        placeholder="T.C Kimlik / Yabancı Kimlik Numaranız"
        onChange={(e) => {
          handleTc(e.target.value);
        }}
        required
        onInput={(e: any) => (e.target.value = e.target.value.slice(0, 11))}
      />

      <input
        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 "
        type="date"
        placeholder="Doğum Tarihiniz"
        onChange={(e) => {
          handleDate(new Date(e.target.value));
        }}
        required
      />
      <InputMask
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        mask="(___) ___-__-__"
        placeholder="Telefon Numaranız"
        replacement={{ _: /\d/ }}
        onChange={(e) => {
          console.log(e.target.value);
          handlePhonenumber(e.target.value);
        }}
      />

      {/* <input
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        type="number"
        placeholder="Telefon Numaranız"
        onChange={(e) => {
          handlePhonenumber(e.target.value);
        }}
        required
        onInput={(e: any) => (e.target.value = e.target.value.slice(0, 10))}
      /> */}
      <input
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        type="text"
        placeholder="Plaka No"
        onChange={(e) => {
          handlePlatenumber(e.target.value);
        }}
        onInput={(e: any) => (e.target.value = e.target.value.slice(0, 8))}
        required
      />
      <input
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        type="number"
        placeholder="Tescil Belge Seri No"
        onChange={(e) => {
          handleRegistrationumber(e.target.value);
        }}
        onInput={(e: any) => (e.target.value = e.target.value.slice(0, 6))}
        required
      />

      {isUserAuthenticated ? (
        <>
          <Button
            variant={"accent"}
            onClick={async () => await saveOfferRequest()}
          >
            Teklif Al
          </Button>
        </>
      ) : (
        <LoginLink>
          <Button className="w-full" size="md">
            Teklif Al
          </Button>
        </LoginLink>
      )}

      {alertMessage && (
        <AlertMessage message={alertMessage.message} type={alertMessage.type} />
      )}
    </>
  );
};

export default KaskoVeTrafik;
