import React from 'react';

const ReportForm = ({value, setvalue, handleSubmit,type,name, placeholder}) => {
    return (
         <form onSubmit={handleSubmit} className="p-1 w-auto max-w-xs grid grid-rows-1 grid-cols-2 items-end relative
      place-content-end">
        <div>
         
          <input placeholder={placeholder}
            className="w-11/12 p-1 border-2 border-transparent rounded"
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={(e) => setvalue(e.target.value)}
          />
        </div>

        <button type="submit"
          disabled={!value?.length}
          className="text-white bg-rose-300 rounded-md py-1  shadow-sm shadow-white  border-2 border-gray-100"
        >
          Submit
        </button>
      </form>
    );
}

export default ReportForm;
