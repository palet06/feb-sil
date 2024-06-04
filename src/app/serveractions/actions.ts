"use server";
import { cache } from "react";
import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { resolve } from "path";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

/* #region INSURANCE-CRUD */
//######################################### INSURANCE CRUD        #######################
export const insuranceListAll = cache(async () => {
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await prismadb.insurance.findMany();

  return res;
});
export const insuranceSingle = cache(async (id: number) => {
  const res = await prismadb.insurance.findUnique({
    where: {
      id: id,
    },
    include: {
      offerRequests: true,
    },
  });
  revalidatePath(`/insurance/${id}`);
  return res;
});
//######################################### END OF INSURANCE CRUD #######################

/* #endregion */

/* #region OFFER-REQUEST-CRUD */
//######################################### OFFER REQUEST CRUD        ###################
export const getOfferRequestList = async (userId: string) => {
  const res = await prismadb.offerRequest.findMany({
    where: {
      userId: userId,
    },
    include: {
      insuranceItself: true,
      userItself: true,
      officialPolicies: true,
    },
  });
  revalidatePath("/dashboard");
  return res;
};

export const createOfferRequest = async (
  offerRequest: Prisma.OfferRequestCreateInput
) => {
  const res = prismadb.offerRequest.create({
    data: {
      ...offerRequest,
    },
  });
  revalidatePath("/dashboard");
  return res;
};

export const deleteOfferRequest = async (id: number) => {
  const res = prismadb.offerRequest.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard");
  return res;
};

/* #endregion */

//######################################### END OF OFFER REQUEST CRUD ###################
