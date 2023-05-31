import axios from "axios";
import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { queryInstance } from "../../api";
import useAuth from "../../hooks/useAuth";
import EditForm from "./EditForm";
import "./editProduct.css";
import { GetError } from "../other/OtherFuctions";
import SingleProductEvents from "../Notifications/SingleModel/SingleProductEvents";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorMessage from "../StatusMessages/ErrorMessage";

const EditProductPage = ({ socket }) => {
  const { id } = useParams();
  const {token, isAdmin, isManager } = useAuth();
  const [product, setproduct] = useState({});
  const [stocks, setstocks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [showNotify, setShowNotify] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setisLoading(true);
      setisSuccess(false);
      // queryInstance(`/products/${id}`)
      await axios
        .all([
          queryInstance.get(`/products/${id}`, {headers:{Authorization: `Bearer ${token}`}}),
          queryInstance.get(`/stocks`,{headers:{Authorization: `Bearer ${token}`}}),
        ])
        .then((res) => {
          console.log(res);
          setproduct(res[0]?.data?.product);
          setstocks(res[1]?.data?.stocks);
          setisSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          seterrorMessage(GetError(err))
        })
        .finally(() => setisLoading(false));
    };
    fetchProduct();

    return () => {};
  }, [id, isAdmin, isManager, socket, token]);

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
              <div className="absolute top-0 bottom-0 right-0 left-0 
          opacity-40 bg-gray-500 m-auto">
            <SpinnerLoader />
          </div>}
            {errorMessage?.length?
              (<ErrorMessage error={errorMessage}
              handleReset={() => { seterrorMessage('') }} />) : null}
        <div className="h-auto w-full self-stretch justify-center py-2">
          <EditForm
            product={product}
            setproduct={setproduct}
            socket={socket}
            stocks={stocks}
          />
          
            </div>
            <button className="text-white rounded-md md:mx-10 mx-4 
            my-3 w-fit p-2 text-lg text-center
             bg-orange-600 shadow-md shadow-zinc-100"
              onClick={() => setShowNotify(!showNotify)}>
              Show Updates
            </button>
            {showNotify && <SingleProductEvents />}
            </div>
      ) : (
            <div className="p-6 text-center my-5">
              <h3>{errorMessage }</h3>
          <p>Product no found</p>
        </div>
      )}
    </div>
  );
};

export default EditProductPage;
