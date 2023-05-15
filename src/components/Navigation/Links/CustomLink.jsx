import  Typography  from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({showSideMenu, icon, title, href}) => {
    return (
        <Link style={{marginInline:'10px'}}
          to={href}
          className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
                 m-auto text-start justify-start flex flex-row 
                 lg:gap-8 xl:gap-10 md:gap-x-8 gap-x-4 items-center 
                 hover:text-blue-400 transition-all `}
        >
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            {icon}
          </button>
        <span style={{marginLeft:'25px'}}
          className="md:text-2xl text-lg capitalize ">
          {title}
        </span>
        </Link>
    );
}

export default CustomLink;


//  <Link
//           to="/dashboard"
//           className={`${showSideMenu ? "w-full ml-5 " : "-ml-96"} mr-auto
//                  m-auto text-start justify-start flex flex-row md:gap-x-7 gap-x-4 items-center 
//                  hover:text-blue-400 transition-all `}
//         >
//           <button
//             className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg  "
//           >
//             &#9776;
//           </button>
//           <Typography  className="ml-3">
//             Dashboard
//           </Typography>
//         </Link>