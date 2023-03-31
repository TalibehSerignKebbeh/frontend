// import { GridActionsCellItem } from '@mui/x-data-grid';
// import { format } from 'date-fns';
import React from 'react';
// import { Link } from 'react-router-dom';


//     const columns = [
//          { field: 'name', headerName: 'Name', width: 140 },

//        { type: 'number', field: 'productCount', headerName: 'Products', width: 100, },

//        {
//             field: 'createdDate', headerName: 'AddedAt', width: 120,
//             valueGetter: ({ value }) => value ? format(new Date(value), 'do MMM yyyy') : 'missing'
//         },
//         {
//             field: 'lastUpdate', headerName: 'LastUpdated', width: 120,
//             valueGetter: ({ value }) => value ? format(new Date(value), 'do MMM yyyy') : 'missing'
//         },
//          {
//       field: "actions",
//       headerName: "Actions",
//       type: "actions",
//       width: 190,
//       getActions: (params) => [
       
//         <GridActionsCellItem sx={{p:1, py:'4px', borderRadius:0, boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
//           icon={
//             <Link
//               className="font-normal  p-1"
//               to={`/stocks/${params.id}/products`}
//             >
//               Products
//             </Link>
//           }
              
//           label="Products"
//           />,
//           <GridActionsCellItem sx={{p:1, py:'4px', borderRadius:0, boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
//               onClick={() => { setopenEdit(true);  setstock(params?.row)}}
//           icon={ <EditRounded  />}
//           label="Edit"
//         />,
//           <GridActionsCellItem sx={{p:1, py:'4px',color:'darkred', borderRadius:0, boxShadow:'0px 0px 2px 0px rgba(0,0,0,0.6)'}}
//               onClick={() => handleStartDelete(params?.row)}
//           icon={ <DeleteSweep  />}
//           label="Delete"
//         />,
//       ],
//     },
//     ]
const TemplateData = () => {
    return (
        <div>
            
        </div>
    );
}

export default TemplateData;
