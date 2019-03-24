import React from 'react';
import cmt from './../images/cmt.png';
import {connect} from 'react-redux';
import {getMedialDetail} from './../actions/actions';

class CommmentComponent extends React.Component {

    showDetail = (e) => {
        this.props.getMedialDetail(this.props.id);
    }

    render() {
        return (
            <React.Fragment>
                <img alt="" onClick={this.showDetail} className="r-detail-img-icon" src={cmt}/>
                <span className="r-detail-padding-10">{typeof(this.props.commented) != 'undefined' && this.props.commented}</span>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMedialDetail: (id) => {
            dispatch(getMedialDetail(id))
        }
    }
}

export default connect(null, mapDispatchToProps) (CommmentComponent);