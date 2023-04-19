
import React from 'react';
import { Select, Spin } from "antd";
import debounce from 'lodash/debounce';


const SearchSelect = ({ handleSearch, fetching, options, ...props }) => {
    let selectOptions = options?.map((option, id) => {
        return {value:option?._id,
            label: `${option?.name} ${option?.price} ${option?.quantityInStock} `,
        }
    })
    return (
        <Select 
            
            onSearch={handleSearch}
            options={selectOptions}
        showSearch={true}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            {...props}
        />
    );
}

export default SearchSelect;
