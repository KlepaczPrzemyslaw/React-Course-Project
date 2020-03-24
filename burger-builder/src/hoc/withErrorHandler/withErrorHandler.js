import React, {Fragment, Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        constructor(params) {
            super(params);

            this.reqInt = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInt = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInt);
            axios.interceptors.response.eject(this.resInt);
        }

        clearErrorHandler = () => {
            this.setState({error: null});
        };

        render () {
            return (
                <Fragment>
                    <Modal
                        show={!!this.state.error}
                        clickBackdrop={this.clearErrorHandler}
                        loading={false}>
                        {this.state.error?.message}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Fragment>
            );
        }
    }
};

export default withErrorHandler;
