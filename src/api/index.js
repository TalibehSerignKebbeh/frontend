import axios from "axios";

export const serverUrl = process.env.REACT_APP_API;
const token = localStorage.getItem('token')
export const queryInstance = axios.create({ baseURL: serverUrl });
queryInstance.interceptors.request.use(
  function (req) {
    // const {token} = useAuth()

    req.headers["authorization"] = `Bearer ${token}`;
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
    if (err?.response?.status === 403) {
      // console.log(err?.response?.data?.message);
      // console.log("What has happen");
      // const customEvent = new CustomEvent()
      // document.dispatchEvent()
      const tokenExpiredEvent = new CustomEvent("tokenExpired", {
        detail: { status: 403 },
      });
      document.dispatchEvent(tokenExpiredEvent);
    }
    return Promise.reject(err);
  }
);

export const LoginFunc = (user) => {
  return queryInstance.post("/auth", { ...user });
};
export const fetchProducts = ({ startDate, endDate,quantityThreshold,
revenueThreshold }) => {
  return queryInstance
    .get(`/products`, {params:{startDate, endDate,quantityThreshold,revenueThreshold}})
    .then((res) => Promise.resolve(res?.data))
    .catch((err) =>  Promise.reject(err));
};
export const fetchSales = ({ page, pageSize, selectedDate }) => {
  return queryInstance
    .get(
      `/sales?page=${page}&&pageSize=${pageSize}&&saleDate=${selectedDate}`,
      { params: { page: page, pageSize: pageSize, saleDate: selectedDate } }
    )
    .then((res) => {
      const hasNext = page * 2 <= res?.data?.totalSales;
      return {
        nextPage: hasNext ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        sales: res?.data?.sales,
      };
    });
};
export const fetchSalesStats = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();
  return queryInstance
    .get(`/sales/stats?year=${year}&month=${month}&date=${date}`)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchProductsStats = () => {
  return queryInstance
    .get(`/products/stats`)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchSalesToday = () => {
  return queryInstance
    .get(`/sales/stats/date?saleDate=${new Date().toUTCString()}`)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchSalesStatistic = () => {
  return queryInstance
    .get(`/sales/stats/date?saleDate=${new Date().toUTCString()}`)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      return err;
    });
};

export const fetchStocks = () => {
  return queryInstance
    .get(`/stocks`)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      return err;
    });
};
export const fetchUsers = () => {
  return queryInstance
    .get(`/users`)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      console.log("logging error ");
      console.log(err);
      return err;
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
      return err;
    });
};
