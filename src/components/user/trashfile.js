//  const validate = (values) => {
//     const errors = {
//       username: "",
//       firstName: "",
//       lastName: "",
//       password: "",
//       confirmNewPassword: "",
//     };
//     if (!values?.username) {
//       errors.username = "Username is required";
//     }
//     if (!values?.firstName) {
//       errors.firstName = "FirstName is required";
//     }
//     if (!values?.lastName) {
//       errors.lastName = "LastName is required";
//     }
//     if (!values?.roles?.length) {
//       errors.roles = "Roles is required";
//     }
//     if (values?.password?.trim()?.length > 0) {
//       if (values?.password !== values?.confirmNewPassword) {
//         if (values?.password !== values?.confirmNewPassword) {
//           errors.confirmNewPassword = "Password must match";
//         }
//       }
//     }
//     return errors;
//   };
//   const handleUpdateuser = async () => {
//     const id = UserData?._id;
//     // console.log(UserData);
//     const errors = validate(UserData);
//     setuserErrors(errors);
//     console.log(errors);

//     if (Object.values(errors).every((val) => val !== "")) return;

//     setEditStatus({ ...EditStatus, updating: true });
//     await queryInstance
//       .put(`/users/${id}`, UserData)
//       .then((res) => {
//         if (res.status === 200) {
//           setstatusMessage({
//             ...statusMessage,
//             updateSuccess: res?.data?.message,
//           });
//           queryClient.invalidateQueries({ queryKey: ["users"] });

//         } if(res?.response.status === 500) {
//           seterrorMessages({
//             ...errorMessages,
//             updateError: "internal server error",
//           }); return;
//         }
//         if(res?.response.status === 400) {
//           seterrorMessages({
//             ...errorMessages,
//             updateError: res?.response?.data?.message,
//           }); return;
//         }else {
//           seterrorMessages({
//             ...errorMessages,
//             updateError: res?.response?.data?.message,
//           });
//         }
//         // console.log(res);
//       })
//       .catch((err) => {
//         // alert(err?.response?.data?.message)
//         seterrorMessages({
//           ...errorMessages,
//           updateError: err?.response?.data?.message,
//         });
//         console.log(err?.response?.data?.message);
//         console.log(err);
//       })
//       .finally(async () => {
//         setEditStatus({ ...EditStatus, updating: false });
//         queryClient.invalidateQueries({ queryKey: ["users"] });
//       });
//   };