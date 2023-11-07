import axios from "axios";
import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { queryInstance } from "../../api";
import useAuth from "../../hooks/useAuth";
import EditForm from "./EditForm";
import "./editProduct.css";
import { GetError } from "../other/OtherFuctions";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SkeletonLoaders from "../Loaders/SkelelonLoader";

const EditProductPage = ({ socket, setactiveNavLink }) => {
  const { id } = useParams();
  const {token, isAdmin } = useAuth();
  const [product, setproduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  
  useEffect(() => {
    // setactiveNavLink('products')
    const fetchProduct = async () => {
      setisLoading(true);
      setisSuccess(false);
      // queryInstance(`/products/${id}`)
      await axios
        .all([
          queryInstance.get(`/products/${id}`, {headers:{Authorization: `Bearer ${token}`}}),
          queryInstance.get(`/categories`,{headers:{Authorization: `Bearer ${token}`}}),
        ])
        .then((res) => {
          // console.log(res);
          setproduct(res[0]?.data?.product);
          setCategories(res[1]?.data?.categories);
          setisSuccess(true);
        })
        .catch((err) => {
          // console.log(err);
          setisSuccess(false)
          seterrorMessage(GetError(err))
        })
        .finally(() => setisLoading(false));
    };
    fetchProduct();

    return () => {};
  }, [id, isAdmin,  socket, token]);

  return (
    <div
      className="w-full h-auto flex flex-row
         items-center justify-center md:mt-12 mt-5
         self-stretch bg-inherit "
    >
      {!product && isLoading ? (
        <SpinnerLoader />
      ) 
          :
       product ? (
          <div className="flex flex-col gap-8">
           { isLoading &&
              <SkeletonLoaders />}
            
            {errorMessage?.length?
              (<ErrorMessage error={errorMessage}
              handleReset={() => { seterrorMessage('') }} />) : null}
        <div className="h-auto w-full self-stretch justify-center py-2">
          <EditForm
            product={{...product, oldInstock: product?.quantityInStock}}
            setproduct={setproduct}
            socket={socket}
            categories={categories}
          />
          
            </div>
                      </div>
      ) : (
            <div className="p-6 text-center my-5
            md:w-1/2 sm:w-11/12 w-full bg-white dark:bg-slate-700
            ">
              <h3 className="my-3 text-red-500">{errorMessage }</h3>
              <p className="text-slate-700 dark:text-white
               text-lg">
                Product no found
              </p>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
