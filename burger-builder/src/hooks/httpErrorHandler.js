import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    const reqInt = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInt = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInt);
            httpClient.interceptors.response.eject(resInt);
        };
    }, [reqInt, resInt]);

    const clearErrorHandler = () => {
        setError(null);
    };

    return [error, clearErrorHandler];
}
