import {Pagination} from 'antd'
import React from 'react'

export default function Paginate({ page, setPage,
pageSize, setPageSize, options, total}) {
  return (
    <div className='w-full flex items-center
    justify-center bg-slate-300
    text-slate-700 dark:text-white md:py-5 py-3'>
      <Pagination
        className='text-slate-700 dark:text-white'
        // style={{ color: '#3336' }}
        
          rootClassName='text-slate-700 dark:text-white'
                current={page+1}
                pageSize={pageSize}
                responsive={true}
                showSizeChanger
                show
                onShowSizeChange={(page, size) => {
                    setPageSize(size);
                    setPage(0)
                }}
                pageSizeOptions={[...options]}
                onChange={(page, size) => {
                  setPage(page-1);
                }}
                showTotal={(total) => `Total  ${total}`}
                total={total}
              />
    </div>
  )
}
