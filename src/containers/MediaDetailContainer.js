import React from 'react';
import {connect} from 'react-redux';
import {getMedialDetail} from './../actions/actions';
import MediaDetailComponent from './../components/MediaDetailComponent';

class MediaDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.props.getMedialDetail(id);
    }
    
    render() {
        var {mediaDetail} = this.props;
        return (
            <div className="row row-margin">
                <MediaDetailComponent
                    image={mediaDetail.image}
                    title={mediaDetail.title}
                    url={mediaDetail.url}
                    interactions={mediaDetail.interactions}
                    comments={mediaDetail.comments}
                    author={mediaDetail.author}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mediaDetail: state.mediaDetailReducer
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        getMedialDetail: (id) => {
            dispatch(getMedialDetail(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp) (MediaDetailContainer);

