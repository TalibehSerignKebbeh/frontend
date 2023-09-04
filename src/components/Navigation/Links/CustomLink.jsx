import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({showSideMenu, icon, title, href}) => {
    return (
        <Link  
          to={href}
          className={`ml-6 mr-auto text-slate-800 dark:text-white
                 m-auto text-start justify-start flex flex-row 
                 lg:gap-7 xl:gap-10 md:gap-x-5 gap-x-3 items-center 
                 hover:text-blue-400 transition-all relative
                 `}
      >
         {/* <span className='absolute left-0 h-full w-2 bg-blue-400'>|</span> */}
          <button className="beatiful-shadow p-1 rounded-lg md:text-lg text-lg">
            {icon}
          </button>
        <span 
          className="text-lg capitalize ">
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