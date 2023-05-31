import { Pagination } from 'antd';
import React from 'react'

export default function Paginnation(props) {
    const { page, pageSize, setpage, setpageSize, rowCount } = props;
  return (
   <Pagination
            className="bg-slate-50 text-slate-700
            dark:bg-slate-700 dark:text-slate-50"
            pageSize={pageSize}
            current={page + 1} total={rowCount}
            onChange={(page) => {
              setpage(page - 1);
            }}
            showSizeChanger
            showTotal onShowSizeChange={(newSize) => {
              setpageSize(newSize)
            }}

          />
  )
}
