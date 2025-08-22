import { createContext, useState } from "react";

type RefreshContext = {
    refresh: boolean;
    setRefresh: (value: boolean) => void;
}

export const RefreshContext = createContext<RefreshContext | undefined>(undefined);

export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [refresh, setRefresh] = useState<boolean>(false);

    const values = {
        refresh,
        setRefresh
    }

    return (
        <RefreshContext.Provider value={values}>
            {children}
        </RefreshContext.Provider>
    );
}