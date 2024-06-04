import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { InputMask } from "@react-input/mask";
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
import { useRouter } from "next/navigation";
const DepremVeKonut = ({
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
  const [address, setAddress] = useState<string>();
  const [homestatus, setHomestatus] = useState<number>();
  const [surfacearea, setSurfacearea] = useState<number>();
  const [apartmentage, setApartmentage] = useState<number>();
  const [vacancyperiod, setVacancyperiod] = useState<number>();
  const [risklocated, setRisklocated] = useState<number>();
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
  const handlePhonenumber = (e: string) => {
    var str = e.replace(/[- )(]/g, "");
    setPhonenumber(str);
  };
  const handleAddress = (e: string) => {
    setAddress(e);
  };
  const handleHomestatus = (e: number) => {
    setHomestatus(e);
  };
  const handleSurfacearea = (e: number) => {
    setSurfacearea(e);
  };
  const handleApartmentage = (e: number) => {
    setApartmentage(e);
  };
  const handleVacancyperiod = (e: number) => {
    setVacancyperiod(e);
  };
  const handleRisklocated = (e: number) => {
    setRisklocated(e);
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
    birthdate: z.date({ message: "Lütfen doğum tarihinizi belirtin" }),
    phonenumber: z
      .string({
        message: "Lütfen telefon numaranızı belirtin",
      })
      .min(10, {
        message: "Eksik ya da hatalı telefon numarası",
      }),
    address: z.string({ message: "Lütfen adresinizi belirtin" }),
    homestatus: z.number({ message: "Lütfen evinizin durumunu belirtin" }),
    surfacearea: z.number({
      message: "Lütfen evinizin kaç metrekare olduğunu belirtin",
    }),
    apartmentage: z
      .number({ message: "Lütfen evinizin inşa yılını belirtin" })
      .min(2020, { message: "Evinizin yaşı 2020 den eski olamaz" })
      .max(2024, { message: "Bina yaşı ileri tarih olamaz" }),
    vacancyperiod: z.number({
      message: "Lütfen evinizin boş kalma süresini belirtin",
    }),
    risklocated: z.number({
      message: "Lütfen rizikonun bulunduğu katı belirtin",
    }),
  });
  const saveOfferRequest = async () => {
    let validateObj = {
      tc: tcKimlik,
      birthdate: date,
      phonenumber: phonenumber,
      address: address,
      homestatus: homestatus,
      surfacearea: surfacearea,
      apartmentage: apartmentage,
      vacancyperiod: vacancyperiod,
      risklocated: risklocated,
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
        pregnancy: undefined,
        weight: undefined,
        height: undefined,
        platenumber: undefined,
        registrationumber: undefined,
        address: address,
        whereto: undefined,
        trippolicydates: undefined,
        tripstartdate: undefined,
        tripenddate: undefined,
        homestatus: homestatus,
        surfacearea: surfacearea,
        apartmentage: apartmentage,
        vacancyperiod: vacancyperiod,
        risklocated: risklocated,
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
      <textarea
        className="h-[78px] resize-none w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 "
        placeholder="Adresiniz"
        onChange={(e) => {
          handleAddress(e.target.value);
        }}
        required
      />

      <Select
        required={true}
        onValueChange={(e) => {
          handleHomestatus(Number(e));
        }}
      >
        <SelectTrigger className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          <SelectValue placeholder="Evinizin Durumu" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Kendi evimde oturuyorum (Bina+Eşya)</SelectItem>
          <SelectItem value="2">Evimi kiraya veriyorum (Bina)</SelectItem>
          <SelectItem value="3">Kiracıyım (Eşya)</SelectItem>
        </SelectContent>
      </Select>
      <input
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        type="number"
        placeholder="Metrekare (Brüt)"
        onChange={(e) => {
          handleSurfacearea(Number(e.target.value));
        }}
        required
        onInput={(e: any) => (e.target.value = e.target.value.slice(0, 3))}
      />
      <input
        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        type="number"
        placeholder="İnşa yılı (2020-2024)"
        onChange={(e) => {
          handleApartmentage(Number(e.target.value));
        }}
        required
        onInput={(e: any) => (e.target.value = e.target.value.slice(0, 4))}
      />
      <Select
        required={true}
        onValueChange={(e) => {
          handleVacancyperiod(Number(e));
        }}
      >
        <SelectTrigger className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          <SelectValue placeholder="Evinizin Boş Kalma Süresi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">3 Aya Kadar</SelectItem>
          <SelectItem value="2">3 Ay ve Üzeri</SelectItem>
        </SelectContent>
      </Select>

      <Select
        required={true}
        onValueChange={(e) => {
          handleRisklocated(Number(e));
        }}
      >
        <SelectTrigger className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:[#455fb5] focus-visible:ring-offset-2 ">
          <SelectValue placeholder="Rizikonun Bulunduğu Kat" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Bodrum Kat</SelectItem>
          <SelectItem value="2">Zemin Kat</SelectItem>
          <SelectItem value="3">Ara Kat</SelectItem>
          <SelectItem value="4">Çatı Katı</SelectItem>
          <SelectItem value="5">Müstakil / Tüm Bina</SelectItem>
        </SelectContent>
      </Select>
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

export default DepremVeKonut;
