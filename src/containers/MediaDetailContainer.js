import React from 'react';
import {connect} from 'react-redux';
import {getMedialDetail, resetMediaDetail} from './../actions/actions';
import MediaDetailComponent from './../components/MediaDetailComponent';
import ListRelativeMediaContainer from './ListRelativeMediaContainer';

class MediaDetailContainer extends React.Component {

    componentDidMount() {
        this.props.resetMediaDetail();
        window.scrollTo(0, 0);
        let id = this.props.match.params.id;
        this.props.getMedialDetail(id);
    }
    
    render() {
        var {mediaDetail} = this.props;
        return (
            <div className="row row-margin">
                <div className="padding-5 col-lg-9 col-sm-12">
                    {mediaDetail.userInteraction !== undefined && <MediaDetailComponent
                        key={mediaDetail.id}
                        mediaId={mediaDetail.id}
                        image={mediaDetail.image}
                        title={mediaDetail.title}
                        url={mediaDetail.url}
                        interactions={mediaDetail.interactions}
                        userInteraction={mediaDetail.userInteraction}
                        comments={mediaDetail.comments}
                        author={mediaDetail.author}
                    />}
                </div>
                <div className="padding-5 col-lg-3 col-sm-12">
                    <ListRelativeMediaContainer mediaId={this.props.match.params.id} categoryId={this.props.match.params.categoryId}/>
                </div>
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
        },
        resetMediaDetail: async () => {
            await dispatch(resetMediaDetail());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp) (MediaDetailContainer);

