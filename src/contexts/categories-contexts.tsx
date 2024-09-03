import React, { FC, ReactNode, useEffect, useState } from "react";
import { ICategory } from "../interface/ICategory";
import { getCategories } from "../services/data-service";

type CategoriesContextInterface = {
    categories: ICategory[];
};

export const CategoriesContext = React.createContext<CategoriesContextInterface>(
    {} as CategoriesContextInterface,
);

interface CategoriesContextProviderProps {
    children: ReactNode;
}
export const CategoriesContextProvider: FC<CategoriesContextProviderProps> = ({ children }: any) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    const fetchCategories = async () => {
        setCategories(await getCategories());
    }

    useEffect(() => {
        // TODO: add snapshot listeners for all active orders
        try {
            fetchCategories()
        } catch (e) {

        }
    }, []);

    return (
        <CategoriesContext.Provider
            value={{
                categories
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
};
