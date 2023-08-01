import axios from "axios";


// export const serverUrl = 'https://custom-ims-api.onrender.com';
// export const serverUrl = 'http://localhost:4500';
// export const serverUrl = 'https://ims-app-backend.onrender.com'
export const serverUrl = 'https://custom-ims-api-2jbe.onrender.com'

export const queryInstance
  = 
  axios.create({ baseURL: serverUrl});
// export const queryInstance = axios.create({ baseURL: serverUrl, withCredentials: true, });

// queryInstance.defaults.withCredentials = true;
queryInstance.interceptors.request.use(
  function (req) {
      return req;
  },
  function (err) {
    return Promise.reject(err);
  }
);
queryInstance.interceptors.response.use(
  function async(res) {
   
    return Promise.resolve(res);
  },
  function (err) {
    
    return Promise.reject(err);
  }
);

export const LoginFunc = (user) => {
  return queryInstance.post("/auth", { ...user });
};
export const fetchProducts = ({token, startDate, endDate,quantityThreshold,
revenueThreshold }) => {
  return queryInstance
    .get(`/products`, {params:{startDate, endDate,quantityThreshold,revenueThreshold}, headers:{Authorization:`Bearer ${token}`}})
    .then((res) => Promise.resolve(res?.data))
    .catch((err) =>  Promise.reject(err));
};
export const fetchSales = ({ page, pageSize, selectedDate,token }) => {
  return queryInstance
    .get(
      `/sales?page=${page}&&pageSize=${pageSize}&&saleDate=${selectedDate}`,
      { params: { page: page, pageSize: pageSize, saleDate: selectedDate },headers:{Authorization:`Bearer ${token}`} } )
    .then((res) => {
      const hasNext = page * 2 <= res?.data?.totalSales;
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        sales: res?.data?.sales,
      };
    });
};
export const fetchSalesStats = ({token}) => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate()-3;
  return queryInstance
    .get(`/sales/stats?year=${year}&month=${month}&date=${date}`,{headers:{Authorization:`Bearer ${token}`}})
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
export const fetchProductsStats = ({ token }) => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  const date = new Date().getDate()
  return queryInstance
    .get(`/products/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        lastSeven: new Date(year, month, date-7),
      today: new Date(year, month, date)}
    })
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
       return Promise.reject(err);
    });
};
export const fetchSalesToday = ({token}) => {
  return queryInstance
    .get(`/sales/stats/date?saleDate=${new Date().toUTCString()}`,{headers:{Authorization:`Bearer ${token}`}})
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
       return Promise.reject(err);
    });
};

export const fetchSalesStatistic = ({token}) => {
  return queryInstance
    .get(`/sales/stats/date?saleDate=${new Date().toUTCString()}`,{headers:{Authorization:`Bearer ${token}`}})
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
       return Promise.reject(err);
    });
};

export const fetchStocks = ({token,page,pageSize}) => {
  return queryInstance
    .get(`/categories`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {page, pageSize}
    })
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
       return Promise.reject(err);
    });
};
export const fetchUsers = ({token,page,pageSize}) => {
  return queryInstance
    .get(`/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params:{page:page, pageSize:pageSize}
    })
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      console.log("logging error ");
      console.log(err);
       return Promise.reject(err);
    });
};
export const UpdateUser = (user) => {
  let id = user?._id;
  return queryInstance
    .put(`/users/${id}`)
    .then((res) => {
      console.log(res);
      return res?.data;
    })
    .catch((err) => {
       return Promise.reject(err);
    });
};
