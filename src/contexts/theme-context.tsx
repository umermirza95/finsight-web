import React, { FC, ReactNode, useEffect, useState } from "react";
import ITheme from "../interface/ITheme";
import { THEME1 } from "../theme-colors";


type ThemeContextInterface = {
    theme: ITheme;
};

export const ThemeContext = React.createContext<ThemeContextInterface>(
    {} as ThemeContextInterface,
);

interface ThemeContextProviderProps {
    children: ReactNode;
}
export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }: any) => {
    const [theme, setTheme] = useState<ITheme>(THEME1);


    return (
        <ThemeContext.Provider
            value={{
                theme
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
