import  React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonLoaders() {
  return (
    <div className='w-full bg-slate-200'>
      <Skeleton  sx={{width:'100%', height:'90px'}} />
      <Skeleton sx={{width:'100%', height:'90px'}} animation="wave" />
      <Skeleton sx={{width:'100%', height:'90px'}} animation={false} />
    </div>
  );
}