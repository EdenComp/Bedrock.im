import {PropsWithChildren} from "react";
import {UserContextProvider} from "../context/useUserContext.tsx";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <UserContextProvider>
      {children}
    </UserContextProvider>
  );
}
