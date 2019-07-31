import React from 'react';
import Modal from 'react-bootstrap/Modal';

class PopupNotificationLogin extends React.Component {
    render() {
        return (
            <Modal show={this.props.showModal} onHide={() => this.setState({showModal: false})} backdrop={true}>
                <Modal.Body>
                    <div className="row">
                        <span className="m-auto" style={{fontSize: 20, fontWeight: 400}}>You need to login</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="mb-2 btn btn-sm btn-warning m-auto">OK</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default PopupNotificationLogin;