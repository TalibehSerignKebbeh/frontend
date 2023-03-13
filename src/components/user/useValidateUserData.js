import React, {useEffect, useState} from 'react';

const UseValidateUserData = ({ values, setvalues }) => {
    const [errors, seterrors] = useState({
        username: '', firstName: '', lastName: '',
        password:'', confirmpasswrod:''
    });
   useEffect(() => {
       if (!values.username) {
        
    }
    
   }, [values.username]);
    return {};
}

export default UseValidateUserData;
