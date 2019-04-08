import React from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import * as config from './../configs/configs';
import * as constant from './../constants/constants';
import {getToken} from './../actions/actions';

class ReportComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rpValue: '',
            isShowModal: false
        }
    }

    doReport = () => {
        let token = getToken();
        if(this.state.rpValue === '' || token === '')
            return;
        let url = config.API_REPORT_MEDIA;
        axios.put(url, {id: this.props.mediaId, content: this.state.rpValue}, {headers: {'Authorization': token}}).then(res => {
            this.setState({isShowModal: false});
        })
    }

    changeValue = (event) => {
        this.setState({
            rpValue: event.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
            <div className="r-margin-left-50 text-right">
                <i className="fa fa-bars cursor" aria-hidden="true" onClick={() => this.setState({isShowModal: true})}></i>
            </div>
            <Modal show={this.state.isShowModal} onHide={() => this.setState({isShowModal: false})}>
                    <Modal.Body style={{padding: '1rem'}}>
                        <div className="flex" onChange={this.changeValue}>
                            <div className="custom-control custom-radio mb-1">
                                <input type="radio" id="rp1" className="custom-control-input" name="report" value={constant.RP1}/>
                                <label className="custom-control-label" htmlFor="rp1">{constant.RP1}</label>
                            </div>
                            <div className="custom-control custom-radio mb-1">
                                <input type="radio" id="rp2" className="custom-control-input" name="report" value={constant.RP2}/>
                                <label className="custom-control-label" htmlFor="rp2">{constant.RP2}</label>
                            </div>
                            <div className="custom-control custom-radio mb-1">
                                <input type="radio" id="rp3" className="custom-control-input" name="report" value={constant.RP3}/>
                                <label className="custom-control-label" htmlFor="rp3">{constant.RP3}</label>
                            </div>
                            <div className="custom-control custom-radio mb-1 text-center">
                                <button onClick={this.doReport} type="button" className="mb-2 btn btn-sm btn-warning mr-1">Report</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ReportComponent;