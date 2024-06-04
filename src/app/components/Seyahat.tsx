import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Prisma } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { createOfferRequest } from "../serveractions/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import AlertMessage from "./AlertMessage";
import { format } from "date-fns";
import { Label } from "./ui/label";
import { InputMask } from "@react-input/mask";
import { useRouter } from "next/navigation";

const Seyahat = ({
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
  const [phonenumber, setPhonenumber] = useState<string>();
  const [whereto, setWhereto] = useState<number>();
  const [tripstartdate, setTripstartdate] = useState<Date | null>(null);
  const [trippolicydates, setTrippolicydates] = useState<number>();
  const [tripenddate, setTripenddate] = useState<Date | null>(null);
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

  useEffect(() => {
    if (tripstartdate && trippolicydates) {
      const res = new Date();
      res.setDate(tripstartdate?.getDate() + trippolicydates);
      setTripenddate(res);
    }
  }, [trippolicydates, tripstartdate]);

  const handleDate = (date: Date) => {
    setDate(new Date(date));
  };
  const handleTripstartdate = (date: Date) => {
    setTripstartdate(new Date(date));
  };
  const handlePhonenumber = (e: string) => {
    var str = e.replace(/[- )(]/g, "");
    setPhonenumber(str);
  };
  const handleTrippolicydates = (date: number) => {
    setTrippolicydates(date);
  };
  const handleTripenddate = (date: Date) => {
    setTripenddate(date);
  };

  const handleTc = (e: string) => {
    setTcKimlik(e);
  };
  const handleWhereto = (e: number) => {
    setWhereto((a) => e);
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
    birthdate: z.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Doğum tarihi eksik ya da yalnış"
            : "Lütfen doğum tarihinizi girin",
      }),
    }),
    phonenumber: z
      .string({
        message: "Lütfen telefon numaranızı belirtin",
      })
      .min(10, {
        message: "Eksik ya da hatalı telefon numarası",
      }),
    whereto: z.number({ message: "Lütfen yolculuk durumunuzu belirtin" }),
    tripstartdate: z.date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Seyahat başlangıç tarihi eksik ya da yalnış"
            : "Lütfen seyahat başlangıç tarihinizi girin",
      }),
    }),
    trippolicydates: z.number({ required_error: "Poliçeniz kaç gün olacak" }),
  });
  const saveOfferRequest = async () => {
    let validateObj = {
      tc: tcKimlik,
      birthdate: date,
      phonenumber: phonenumber,
      whereto: whereto,
      tripstartdate: tripstartdate,
      trippolicydates: trippolicydates,
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
        phonenumber: phonenumber,
        pregnancy: undefined!,
        weight: undefined,
        height: undefined,
        platenumber: undefined,
        registrationumber: undefined,
        address: undefined,
        whereto: whereto,
        trippolicydates: trippolicydates,
        tripstartdate: tripstartdate,
        tripenddate: tripenddate,
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

      <Select
        required={true}
        onValueChange={(e) => {
          handleWhereto(Number(e));
        }}
      >
        <SelectTrigger className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          <SelectValue placeholder="Seyahat nereye olacak" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Yurt Dışı - Tüm Dünya</SelectItem>
          <SelectItem value="2">Yurt Dışı - Schengen Vizesi</SelectItem>
          <SelectItem value="3">Yurt Dışı - Eğitim</SelectItem>
        </SelectContent>
      </Select>
      <input
        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 "
        type="date"
        placeholder="Poliçe başlangıç tarihi giriniz"
        onChange={(e) => {
          handleTripstartdate(new Date(e.target.value));
        }}
        required
      />

      <Select
        required={true}
        onValueChange={(e) => {
          handleTrippolicydates(Number(e));
        }}
      >
        <SelectTrigger className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          <SelectValue placeholder="Poliçe sürenizi seçin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="3">3</SelectItem>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="31">31</SelectItem>
          <SelectItem value="91">91</SelectItem>
          <SelectItem value="182">182</SelectItem>
          <SelectItem value="365">365</SelectItem>
        </SelectContent>
      </Select>

      {trippolicydates !== undefined &&
      tripstartdate !== null &&
      tripenddate ? (
        <Label className="h-auto w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          Poliçe Bitiş Tarihiniz <br />
          {format(tripenddate?.toString(), "dd-MM-yyyy")}
        </Label>
      ) : (
        <Label className="h-auto w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          Poliçe Bitiş Tarihiniz <br />
        </Label>
      )}

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

export default Seyahat;
