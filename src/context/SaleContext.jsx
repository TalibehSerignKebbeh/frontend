import { createContext, useContext, useState } from "react";

const SaleContext = createContext()


export const SaleContextProvider = ({children}) => {
    const [productsForSale, setProductsForSale] = useState(JSON.parse(localStorage.getItem('sales')) || []);

    const AddProduct = (product) => {
        const newArray = [...productsForSale, product]
        localStorage.setItem('sales', JSON.stringify(newArray))
        setProductsForSale([...newArray])
    }

    const SetProductSalesArray = (array) => {
        localStorage.setItem('sales', JSON.stringify([...array]))
        setProductsForSale([...array])
    }

    const ClearProductsForSale = () => {
        localStorage.removeItem('sales')
        setProductsForSale(prev=>[])
    }

    
    return <SaleContext.Provider
        value={{
            AddProduct, SetProductSalesArray, ClearProductsForSale,
        productsForSale, setProductsForSale}}>
        {children}
    </SaleContext.Provider>

}

export const useSaleContext =()=> useContext(SaleContext)