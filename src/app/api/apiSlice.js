import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { serverUrl } from '../../api';

const baseQuery = fetchBaseQuery({
    baseUrl: serverUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = getState()?.auth?.token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
    }
})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["User", "Sale","Stock", "Product"],
    endpoints:()=>({})
})