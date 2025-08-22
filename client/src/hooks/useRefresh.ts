import { useContext } from "react";
import { RefreshContext } from "../contexts/RefreshContext";

export const useRefresh = () => {
    const context = useContext(RefreshContext);
    if (!context) {
        throw new Error("useRefresh must be used within RefreshProvider");
    }
    return context;
};
