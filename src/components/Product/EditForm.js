import  IconButton  from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { queryInstance } from "../../api";
import ConfirmDelete from "../Modal/ConfirmDelete";
import  format  from "date-fns/format";
import  isValid  from "date-fns/isValid";
import parseISO  from "date-fns/parseISO";
import useAuth from "../../hooks/useAuth";
import { GetError } from "../other/OtherFuctions";
import ErrorMessage from "../StatusMessages/ErrorMessage";
import SuccessMessage from "../StatusMessages/SuccessMessage";

const EditForm = ({ product, setproduct, socket, categories }) => {
  const navigate = useNavigate();
  const { token } = useAuth()
  const deleteController = new AbortController()
  //   const [isLoading, setisLoading] = useState(false);
  //   const [isSuccess, setisSuccess] = useState(false);
  const [deleting, setdeleting] = useState(false);
  const [updateSuccessMsg, setupdateSuccessMsg] = useState('');
  const [updateErrorMsg, setupdateErrorMsg] = useState('');
  const [openDelete, setopenDelete] = useState(false);
  const [deleteError, setdeleteError] = useState("");
  const [deleteSuccess, setdeleteSuccess] = useState("");
  const [updateLoading, setupdateLoading] = useState(false);
  const handleStartDelete = () => {
    setopenDelete(true);
  };
  const handleDeleteProduct = async () => {
    if (deleting || updateLoading) return;
    setdeleting(true);
    setdeleteError("");
    await queryInstance
      .delete(`/products/${product?._id}`, { headers: { Authorization: `Bearer ${token}` },signal:deleteController.signal })
      .then((res) => {
        // console.log(res);
        socket.emit("notify_update_product");
        setdeleteSuccess(res?.data?.message);
        navigate(-1);
      })
      .catch((err) => {
        // console.log(err);
        const message = !err?.response ? 'no server response' :
          err?.response?.status === 500 ? 'internal server error' :
            err?.data?.message
        setdeleteError(message);
      })
      .finally(() => setdeleting(false));
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    if (deleting || updateLoading) return;
    setupdateLoading(true);
    console.log(product);
    await queryInstance
      .put(`/products/${product?._id}`, {...product,stockId:product?.stockId?._id}, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);
        let status = res?.data?.status;
        if (status === "success") {
          socket.emit("notify_update_product");
          setupdateSuccessMsg(res?.data?.message)
          
          // alert("update successfull");
        } else {
         setupdateErrorMsg(GetError(res))
        }
      })
      .catch((err) => {
        setupdateErrorMsg(GetError(err))
        // setupdateError(true);
      })
      .finally(() => setupdateLoading(false));
  };
  return (
    <form
      className="h-auto flex flex-row flex-wrap 
                items-center md:w-11/12 w-full gap-y-4 
                gap-x-3 m-auto md:justify-start justify-center
                md:mb-3 mb-14 bg-slate-100 dark:bg-slate-700
              text-gray-600 dark:text-slate-100
                p-3"
    >
    
      <div className="w-full h-auto p-1">
        <div
          className="actionBtns float-right 
          px-2 py-2 flex flex-row gap-16
          md:mr-72 sm:mr-20 mr-4"
        >
          <IconButton onClick={handleEditProduct}>
            {updateLoading ? (
              <CircularProgress />
            ) : (
              <AiFillEdit className="scale-150 text-blue-700" />
            )}
          </IconButton>
          <IconButton onClick={handleStartDelete} disabled={deleting}>
            {deleting ? (
              <CircularProgress />
            ) : (
              <AiFillDelete className="scale-150 text-red-600" />
            )}
          </IconButton>
        </div>
      </div>
      
      {updateErrorMsg?.length ? (
        <ErrorMessage error={updateErrorMsg}
       handleReset={()=>setupdateErrorMsg('')} />
      ) : null}
      {updateSuccessMsg?.length ?
        <SuccessMessage message={updateSuccessMsg}
      resetFunction={()=>setupdateSuccessMsg('')}  /> : null}
      <div className="w-full h-auto ">
        <div className="w-fit py-4 flex 
      flex-row flex-wrap gap-x-16 gap-y-3
      justify-self-center
      bg-white dark:bg-slate-500 p-3">
        <div className="divide-y-2 divide-gray-800
        dark:divide-slate-50">
          <span className="text-xs font-normal ">Added At</span>
          <h2 className="text-gray-600 dark:text-white">
          {isValid(parseISO(product?.createdAt))? format(new Date(product?.createdAt), 'EEE MM dd yyyy, HH:mm b') : 'invalid or not date'}</h2>
        </div>
        <div className="divide-y-2 divide-gray-800
        dark:divide-slate-50">
          <span className="text-xs font-normal ">Updated At</span>
          <h2 className="text-gray-600 dark:text-white">
          {isValid(parseISO(product?.updatedAt))? format(new Date(product?.updatedAt), 'EEE MM dd yyyy, HH:mm b') : 'invalid or not date'}</h2>
        </div>
      </div>
        </div>
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
          w-full block"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3
           px-2 border-2 border-gray-500
           rounded-md w-full"
          type={"text"}
          value={product?.name || ""}
          onChange={(e) => setproduct({ ...product, name: e.target.value })}
          id="name"
          placeholder="product name"
        />
      </div>
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
          w-full block"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3
           px-2 border-2 border-gray-500
           rounded-md w-full"
          type={"text"}
          value={product?.sub_name || ""}
          onChange={(e) => setproduct({ ...product, sub_name: e.target.value })}
          id="sub_name"
          placeholder="product sub name"
        />
      </div>
      <div className="md:w-72 sm:w-68 w-52 text-start relative">
        <label
          className=" font-semibold text-lg
          w-full block"
          htmlFor="quantity-instock"
        >
          Quantity In Stock
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3
            px-2 border-2 border-gray-500
            rounded-md w-full"
          type={"text"}
          value={product?.quantityInStock || ""}
          onChange={(e) =>
            setproduct({
              ...product,
              quantityInStock: Number(e.target.value),
            })
          }
          id="quantity-instock"
          placeholder={` quantity in stock `}
        />
      </div>
      {/* <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
          w-full block"
          htmlFor="quantity"
        >
          Quantity
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3 
           px-2 border-2 border-gray-500
           rounded-md w-full"
          type={"text"}
          value={product?.quantity || ""}
          onChange={(e) => setproduct({ ...product, quantity: e.target.value })}
          id="quantity"
          placeholder="product quantity"
        />
      </div> */}
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
            w-full block"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3 px-2
            border-2 border-gray-500
           rounded-md w-full"
          type={"text"}
          value={product?.price || ""}
          onChange={(e) => setproduct({ ...product, price: e.target.value })}
          id="price"
          placeholder="product price"
        />
      </div>
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
            w-full block"
          htmlFor="price"
        >
          Cost Per Unit
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3 px-2
            border-2 border-gray-500
           rounded-md w-full"
          type={"text"}
          value={product?.unit_cost || ""}
          onChange={(e) => setproduct({ ...product, unit_cost: e.target.value })}
          id="unit_cost"
          placeholder="product per unit cost"
        />
      </div>
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
           w-full block"
          htmlFor="stockId"
        >
          Category
        </label>
        <select
          className="text-gray-600 bg-slate-100
          dark:bg-slate-500
          dark:text-white border-2
           border-gray-700 w-full font-medium
          h-14 rounded-md px-2 mx-auto my-3 p-1"
          value={product?.stockId?._id}
          id="stockId"
          onChange={(e) => setproduct({ ...product, stockId: e.target.value })}
          multiple={false}
        >
          {/* {!product?.s ? <option>None</option> : null} */}
          {categories?.map((stock, id) => (
            <option
              key={id}
              value={stock?._id}
              className={`first-letter:uppercase 
              text-gray-700 dark:text-white `}
            >
              {`${stock?.name},  ${stock?.description || ""}`}
            </option>
          ))}
        </select>
      </div>
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
           w-full block"
          htmlFor="producedDate"
        >
          Produced Date
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium py-3 
           px-2 border-2 border-gray-500
           rounded-md w-full"
          type={"date"}
          value={product?.producedDate?.slice(0, 10)?.toString() || ""}
          onChange={(e) =>
            setproduct({ ...product, producedDate: e.target.value })
          }
          id="producedDate"
          placeholder="product category"
        />
      </div>
      <div className="md:w-72 sm:w-68 w-52 text-start">
        <label
          className=" font-semibold text-lg
           w-full block"
          htmlFor="expiryDate"
        >
          Expiry Date
        </label>
        <input
          className="bg-white dark:bg-slate-500
           text-gray-600 dark:text-white text-xl font-medium 
           py-3 px-2 border-2 border-gray-500
           rounded-md w-full"
          type={"date"}
          value={product?.expiryDate?.slice(0, 10)?.toString() || ""}
          onChange={(e) =>
            setproduct({ ...product, expiryDate: e.target.value })
          }
          id="expiryDate"
        />
      </div>
      <ConfirmDelete
        deleteFunction={handleDeleteProduct}
        deleteLoading={deleting}
        open={openDelete}
        setopen={setopenDelete}
        resetFunc={() => {
          setdeleteError("");
          setdeleteSuccess("");
        }}
        succcessMsg={deleteSuccess}
        message={"product: " + product?.name}
        errorMessage={deleteError}
      />
    </form>
  );
};

export default EditForm;
