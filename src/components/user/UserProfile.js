import React, { useEffect, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { queryInstance } from "../../api";
import { CircularProgress, Typography } from "@mui/material";

const UserProfile = () => {
    const [user, setuser] = useState(null);
    const [profileData, setprofileData] = useState({
        username: '', firstName: '',
        lastName:'',oldpassword:'', password:'', confirmpassword:''
    });
  const [isLoading, setisLoading] = useState(false);
    const [errorMsg, seterrorMsg] = useState("");
    const [passwordMatch, setpasswordMatch] = useState(false);
    const [updateStatus, setupdateStatus] = useState({ status: '', msg:''});

  const profileForm = useFormik({
    initialValues: {
      ...user, password:'', confirmpassword:''
    },
    validate:()=>{}
  })
  useEffect(() => {
    const fetchProfile = async () => {
      setisLoading(true);
      await queryInstance
        .get(`/users/profile`)
        .then((res) => {
          console.log(res);
            setuser(res?.data?.user);
            setprofileData({...res?.data?.user})
        })
        .catch((err) => {
          console.log(err);
          // seterrorMsg(err?.data)
        })
        .finally(() => {
          setisLoading(false);
        });
    };
    fetchProfile();
    return () => {};
  }, []);
    useEffect(() => {
      if (profileData?.password?.length>0) {
        if (profileData.password === profileData.confirmpassword) {
            setpasswordMatch(true)
     } else { setpasswordMatch(false) }
     }else{setpasswordMatch(true)}
    }, [passwordMatch, profileData?.confirmpassword, profileData?.password]);
     
  const UpdateProfile = async (e) => {
    e.preventDefault()
    setupdateStatus({msg:'', status:''})
        await queryInstance.put(`/users/${user?._id}/profile`, profileData)
            .then(res => {
                console.log(res?.data?.message);
                setupdateStatus({...updateStatus, status:'success', msg:res?.data?.message})
            }).catch(err => {
                console.log(err);
                setupdateStatus({...updateStatus, status:'error', msg:err?.response?.data?.message})
                
        })
    }
    const handleInputChange = (e) => {
        const { target: { value, name } } = e;
        setprofileData({...profileData, [name]: value})
  }
  const SignupSchema = Yup.object().shape({
   firstName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   lastName: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });
  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1">
          <CircularProgress />
          <h3>Loading profile data</h3>
        </div>
      ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 my-auto place-items-center">
            {/* <Formik
       initialValues={{
         firstName: '',
         lastName: '',
         email: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form>
           <Field name="firstName" />
           {errors.firstName && touched.firstName ? (
             <div>{errors.firstName}</div>
           ) : null}
           <Field name="lastName" />
           {errors.lastName && touched.lastName ? (
             <div>{errors.lastName}</div>
           ) : null}
           <Field name="email" type="email" />
           {errors.email && touched.email ? <div>{errors.email}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik> */}
          <div className="grid grid-cols-1 ">
            <form style={{boxShadow: ` 0px 0px 3px rgba(0,0,0,0.4) `}} onSubmit={UpdateProfile} className="md:my-4 my-2 bg-white p-2">
                <Typography>Update Your Profile</Typography>
                {updateStatus?.status === "success" && <span className="text-lg text-green-600">{updateStatus?.msg }</span>}
                {updateStatus?.status === "error" && <span className="text-lg text-red-600">{updateStatus?.msg }</span>}
              <div className="p-1 w-auto text-start capitalize">
                <label htmlFor="firstName">FirstName</label>
                <input
                  className="w-full p-2 border-2 "
                  type="text"
                  value={profileData?.firstName}
                  name="firstName"
                  id="firstName" onChange={handleInputChange}/>
              </div>
              <div className="p-1 w-auto text-start capitalize">
                <label htmlFor="lastName">lastName</label>
                <input
                  className="w-full p-2 border-2 "
                  type="text"
                  value={profileData?.lastName}
                  name="lastName"
                  id="lastName" onChange={handleInputChange}/>
              </div>
              <div className="p-1 w-auto text-start capitalize">
                <label htmlFor="username">username</label>
                <input
                  className="w-full p-2 border-2 "
                  type="text"
                  value={profileData?.username}
                  name="username"
                  id="username" onChange={handleInputChange}/>
                </div>
                <div className="p-1 w-auto text-start capitalize">
                <label htmlFor="oldpassword">Old password</label>
                <input
                  className={`w-full p-2 border-2 `}
                  type="password"
                  value={profileData?.oldpassword}
                  name="oldpassword" aria-labelledby="password-error"
                    id="oldpassword" onChange={handleInputChange} />
                  <span aria-label="password-error"></span>
              </div>
              <div className="p-1 w-auto text-start capitalize">
                <label htmlFor="password">password</label>
                <input
                  className={`w-full p-2 border-2 ${passwordMatch? '':'border-red-600'}`}
                  type="password"
                  value={profileData?.password}
                  name="password" aria-labelledby="password-error"
                    id="password" onChange={handleInputChange} />
                  <span aria-label="password-error"></span>
                </div>
                
              <div className="p-1 w-auto text-start capitalize">
                <label htmlFor="confirmpassword">confirmpassword</label>
                <input
                  className={`w-full p-2 border-2 ${passwordMatch? '':'border-red-600'}`}
                  type="password"
                    value={profileData?.confirmpassword}
                    disabled={!profileData?.password?.length}
                  name="confirmpassword"
                  id="confirmpassword" onChange={handleInputChange}/>
              </div>
              <div className="p-1 mt-3 w-auto text-start">
                <button className="p-2 w-full bg-zinc-300"
                  type="submit">
                    Update
                 </button>                    
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
