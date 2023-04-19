import CircularProgress from "@mui/material/CircularProgress";
import  Box  from "@mui/system/Box";
import axios from "axios";
import  format from "date-fns/format";
import  parseISO from "date-fns/parseISO";
import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { queryInstance } from "../../api";
import useAuth from "../../hooks/useAuth";
import EditForm from "./EditForm";
import "./editProduct.css";
import { GetError } from "../other/OtherFuctions";
const EditProductPage = ({ socket }) => {
  const { id } = useParams();
  const { isAdmin, isManager } = useAuth();
  const [product, setproduct] = useState({});
  const [stocks, setstocks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const [productUpdates, setproductUpdates] = useState([]);
  
  const GetStockName = (id) => {
    return stocks?.find(stock => stock?._id?.toString() === id)?.name;
  }
  useEffect(() => {
    if (isAdmin || isManager) {
      const fetchUpdates = async () => {
        await queryInstance.get(`/notifications/products/?id=${id}`).then((res) => {
          if (res?.status === 200) {
            setproductUpdates(res?.data?.notifications);
            console.log(res);
          }
        });
      };
      fetchUpdates();
    }

    const fetchProduct = async () => {
      setisLoading(true);
      setisSuccess(false);
      // queryInstance(`/products/${id}`)
      await axios
        .all([
          queryInstance.get(`/products/${id}`),
          queryInstance.get(`/stocks`),
        ])
        .then((res) => {
          console.log(res);
          setproduct(res[0]?.data?.product);
          setstocks(res[1]?.data?.stocks);
          setisSuccess(true);
        })
        .catch((err) => {
          // console.log(err);
          seterrorMessage(GetError(err))
        })
        .finally(() => setisLoading(false));
    };
    fetchProduct();

    return () => {};
  }, [id, isAdmin, isManager, socket]);

  return (
    <div
      className="w-full h-full flex flex-row
         items-center justify-center md:mt-12 mt-5"
    >
      {isLoading ? (
        <div className="md:mt-14 mt-6">
          <CircularProgress sx={{ color: "red" }} />
        </div>
      ) : product ? (
        <div className="h-auto self-stretch">
          <EditForm
            product={product}
            setproduct={setproduct}
            socket={socket}
            stocks={stocks}
          />
          {((isAdmin || isManager) && productUpdates?.length) && (
            <Box height={"450px"} width={"100%"} overflow="auto">
              <table>
                <thead>
                  <tr>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Action</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Date</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal" colSpan="5">From</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal" colSpan="5">To</th>
                  </tr>
                  <tr>
                    <th className="lg:text-lg md:text-base text-xs font-normal"></th>
                    <th className="lg:text-lg md:text-base text-xs font-normal"></th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Name</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Qty</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">#instock</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">price</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Category</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Desc</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Name</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Qty</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">QtyInstock</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">price</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Category</th>
                    <th className="lg:text-lg md:text-base text-xs font-normal">Desc</th>
                  </tr>
                </thead>
                <tbody>
                  {productUpdates?.map((notify, id) => (
                    <tr className={`${!notify?.isRead? 'bg-red-200':'bg-transparent'}`} key={id}>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.type}</td>
                      <td className="lg:text-lg md:text-base text-xs">{format(
                          parseISO(notify?.created_at),
                          " EEE MM yyyy, HH:mm b"
                        )}</td>

                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.from?.name}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.from?.quantity}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.from?.quantityInStock}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.from?.price}</td>
                      <td className="lg:text-lg md:text-base text-xs">{GetStockName(notify?.data?.from?.stockId)}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.from?.description}</td>

                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.to?.name}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.to?.quantity}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.to?.quantityInStock}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.to?.price}</td>
                      <td className="lg:text-lg md:text-base text-xs">{GetStockName(notify?.data?.to?.stockId)}</td>
                      <td className="lg:text-lg md:text-base text-xs">{notify?.data?.to?.description}</td>

                     
                    </tr>
                  ))}
                 
                </tbody>
              </table>
            </Box>
          )}
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
