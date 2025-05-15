import type { ReactNode } from "react";

export const Button = ({ children }: { children: ReactNode }) => {
    return (
        <button type="submit" className="btn">
            {children}
        </button>
    );
};
