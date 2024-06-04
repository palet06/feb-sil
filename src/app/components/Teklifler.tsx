"use client";

import { Insurance } from "@prisma/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import TeklifDogum from "./TeklifDogum";
import KaskoVeTrafik from "./KaskoVeTrafik";
import Seyahat from "./Seyahat";
import DepremVeKonut from "./DepremVeKonut";
import TamamlayiciVeGenel from "./TamamlayiciVeGenel";

const Teklifler = ({
  hizmet,
  isUserAuthenticated,
  userData,
}: {
  hizmet: Insurance;
  isUserAuthenticated: boolean;
  userData: KindeUser;
}) => {
  return (
    <div>
      <div className="bg-tertiary h-full mb-4">
        <div className="bg-accent py-4 text-center relative mb-2">
          <h4 className="text-xl text-white">Teklif Alın</h4>
          <div
            className="absolute -bottom-[8px] left-[calc(50%_-_10px)] w-0 h-0 
          border-l-[10px] border-l-transparent border-t-[8px] border-t-accent 
          border-r-[10px] border-r-transparent"
          ></div>
        </div>
        <div className="flex flex-col gap-4 h-full w-full py-6 px-8 ">
          {(hizmet.id === 1 || hizmet.id === 2) && (
            <TamamlayiciVeGenel
              hizmet={hizmet}
              isUserAuthenticated={isUserAuthenticated}
              userData={userData}
            />
          )}
          {(hizmet.id === 3 || hizmet.id === 4) && (
            <KaskoVeTrafik
              hizmet={hizmet}
              isUserAuthenticated={isUserAuthenticated}
              userData={userData}
            />
          )}
          {hizmet.id === 7 && (
            <TeklifDogum
              hizmet={hizmet}
              isUserAuthenticated={isUserAuthenticated}
              userData={userData}
            />
          )}

          {hizmet.id === 6 && (
            <Seyahat
              hizmet={hizmet}
              isUserAuthenticated={isUserAuthenticated}
              userData={userData}
            />
          )}
          {hizmet.id === 5 && (
            <DepremVeKonut
              hizmet={hizmet}
              isUserAuthenticated={isUserAuthenticated}
              userData={userData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Teklifler;
