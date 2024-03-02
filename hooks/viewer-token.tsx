"use client";
import { createViewerToken } from "@/actions/token";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState } from "react";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    async function handleToken() {
      const viewerToken = await createViewerToken(hostIdentity);
      setToken(viewerToken);
      const decodedToken = jwtDecode(viewerToken as string) as JwtPayload & {
        name: string;
      };
      const name = decodedToken?.name;
      if (name) {
        setName(name);
      }
      const identity = decodedToken?.jti;
      if (identity) {
        setIdentity(identity);
      }
    }
    handleToken();
  }, [hostIdentity]);


  return {
    token,
    name,
    identity,
  };
};
