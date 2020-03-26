import React, {Fragment, useState, useEffect} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInt = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        });
        const resInt = axios.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInt);
                axios.interceptors.response.eject(resInt);
            };
        }, [reqInt, resInt]);

        const clearErrorHandler = () => {
            setError(null);
        };

        return (
            <Fragment>
                <Modal
                    show={!!error}
                    clickBackdrop={clearErrorHandler}
                    loading={false}>
                    {error?.message}
                </Modal>
                <WrappedComponent {...props}/>
            </Fragment>
        );
    }
};

export default withErrorHandler;
