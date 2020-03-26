import React, {Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Fragment>
                <Modal
                    show={!!error}
                    clickBackdrop={clearError}
                    loading={false}>
                    {error?.message}
                </Modal>
                <WrappedComponent {...props}/>
            </Fragment>
        );
    }
};

export default withErrorHandler;
