import React from 'react';
import {connect} from 'react-redux';
import {getListRelativeMedia, resetRelativeMedia} from './../actions/actions';
import RelativeMediaComponent from './../components/RelativeMediaComponent';
import * as constants from './../constants/constants';
import * as config from './../configs/configs';

class ListRelativeMediaContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.resetRelativeMedia();
        let categoryId = this.props.categoryId;
        let type = this.props.categoryId;
        if(categoryId === constants.GET_RELATIVE_MEDIA_HOT)
            categoryId = config.CATEGORYID_HOT;
        else if(categoryId === constants.GET_RELATIVE_MEDIA_NEW)
            categoryId = config.CATEGORYID_NEW;
        else if(categoryId === constants.GET_RELATIVE_MEDIA_FAVORITED)
            categoryId = config.CATEGORYID_FAVORITED;
        else
            type = constants.GET_RELATIVE_MEDIA;

        this.props.getListRelativeMedia(type, categoryId, 1, this.props.mediaId);
    }

    render() {
        let {data} = this.props.listRelativeMedia;
        return (
            <React.Fragment>
                <div className="stats-small stats-small--1 card-no-border-r">
                    <div className="card-body p-0 d-flex">
                        <div className="d-flex flex-column m-auto">
                            <div className="stats-small__data text-center" >
                                Ads
                            </div>
                        </div>
                        <canvas height="120" className="blog-overview-stats-small-1"></canvas>
                    </div>
                </div>
                {
                    data.length > 0 && data.map((elm, index) => {
                        return (
                                <RelativeMediaComponent
                                    key={index}
                                    categoryId={this.props.categoryId}
                                    id={elm.id}
                                    image={elm.image}
                                    url={elm.url}
                                    title={elm.title}
                                    author={elm.author}
                                    interactions={elm.interactions}
                                    userInteraction={elm.userInteraction}
                                    duration={elm.duration}
                                />
                        );
                    })
                } 
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        listRelativeMedia: state.listRelativeMediaReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListRelativeMedia: (type, categoryId, page, mediaId) => {
            dispatch(getListRelativeMedia(type, categoryId, page, mediaId));
        },
        resetRelativeMedia: async (mediaId) => {
            await dispatch(resetRelativeMedia(mediaId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListRelativeMediaContainer);