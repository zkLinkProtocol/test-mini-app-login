const API_URL = "https://api-intent.sepolia.zklink.io/api"; // "https://api-magic.zklink.io/api";

export const HUB_INTERVAL = 1000;
export const getData = async (sessionId: string) => {
  const res = await fetch(`${API_URL}/hub`, {
    method: "GET",
    headers: {
      sessionId,
    },
  });
  const resp = await res.json();
  return resp;
};
