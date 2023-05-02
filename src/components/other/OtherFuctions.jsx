

export const GetError = (err) => {
    if (!err?.response) {
        return 'No server response, the backend server is down';
    }
    if (err?.response?.status === 500) {
        return "An internal server error occurred";
    }
     if (err?.response?.status === 403) {
        return "Your authentication state has expired please login again";
    }
    if (err?.response?.data?.errors?.length) return err?.response?.data?.errors
    return err?.response?.data?.message

}
