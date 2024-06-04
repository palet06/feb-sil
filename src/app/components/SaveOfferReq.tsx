"use server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import React from "react";
import { z } from "zod";
import { createOfferRequest } from "../serveractions/actions";
import { Prisma } from "@prisma/client";
import { Button } from "./ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

const SaveOfferReq = ({
  hizmet,
  isUserAuthenticated,
  userData,
  tcKimlik,
  date,
  pregnancy,
  setAlertMessage,
}: {
  hizmet: any;
  isUserAuthenticated: any;
  userData: KindeUser;
  tcKimlik: string;
  date: Date;
  pregnancy: any;
  setAlertMessage: any;
}) => {
  const saveTeklif = async () => {
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

      pregnancy: z.boolean({
        required_error: "Lütfen hamilelik durumunuzu belirtin",
        invalid_type_error: "Düzgün girin",
      }),
    });
    let validateObj = {
      tc: tcKimlik,
      birthdate: date,
      pregnancy: pregnancy,
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
        pregnancy: pregnancy!,
        weight: undefined,
        height: undefined,
        platenumber: undefined,
        registrationumber: undefined,
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
      {isUserAuthenticated ? (
        <>
          <Button variant={"accent"} onClick={async () => await saveTeklif()}>
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
    </>
  );
};

export default SaveOfferReq;
