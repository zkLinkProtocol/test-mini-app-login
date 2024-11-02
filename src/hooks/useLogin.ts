import { checkInTelegramMiniApp, generateRandomString } from "../utils";
import { getData, HUB_INTERVAL } from "../utils/hub";
import { useRef, useState, useEffect } from "react";
const MagicLink = import.meta.env.VITE_MAGIC_LOGIN_URL; //  "https://magic-test.zklink.io/intent/";

const StorageKey = "magic-link-smart-account-address";

export const useLogin = () => {
  const sessionIdRef = useRef<string>("");
  const intervalRef = useRef<number | undefined>(undefined);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string>("");

  const login = (chainId?: number) => {
    return new Promise((resolve) => {
      const sessionId = generateRandomString(16);
      sessionIdRef.current = sessionId;
      const loginUrl = `${MagicLink}?chainId=${
        chainId ?? 42161
      }&sessionId=${sessionId}`;
      if (checkInTelegramMiniApp()) {
        const WebApp = (window as any).Telegram.WebApp;
        const loginUrl = `https://t.me/testMagicLink_bot/testmagiclink?startapp=login3rd_${sessionId}`;
        WebApp.openTelegramLink(loginUrl);
      } else {
        window.open(loginUrl, "_blank", "width=600,height=700");
      }

      intervalRef.current = setInterval(async () => {
        const data = await getData(sessionId);
        console.log("data: ", data);
        if (data && data.data) {
          clearInterval(Number(intervalRef.current));
          const account = data.data;
          setSmartAccountAddress(account);
          localStorage.setItem(StorageKey, account);
          resolve(account);
        }
      }, HUB_INTERVAL) as unknown as number;
    });
  };

  const logout = () => {
    localStorage.removeItem(StorageKey);
    setSmartAccountAddress("");
  };

  useEffect(() => {
    const address = localStorage.getItem(StorageKey);
    if (address) {
      setSmartAccountAddress(address);
    }
  }, []);

  return {
    login,
    logout,
    smartAccountAddress,
  };
};
