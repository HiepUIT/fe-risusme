import React from 'react';
import {connect} from 'react-redux';
import {getCategoryDetailFavorited} from './../actions/actions';
import CategoryDetailComponent from './../components/CategoryDetailComponent';
import * as config from './../configs/configs';

class FavoritedContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCategoryDetailFavorited(config.CATEGORYID_FAVORITED, 1);
    }

    render() {
        var {categoryDetails} = this.props;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    ggnlnsklnHotContainer jffafffffffggggggggggggggnlnsklnHotContainer jffafffffffggggggggggggggnlnskln
                </div>
                <div className="row">
                        {
                            categoryDetails.map((elm, index) => {
                                return (
                                        <CategoryDetailComponent
                                            key={index}
                                            id={elm.id}
                                            image={elm.image}
                                            url={elm.url}
                                            title={elm.title}
                                            author={elm.author}
                                            interactions={elm.interactions}
                                        />
                                );
                            })
                        }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        categoryDetails: state.categoryDetailReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryDetailFavorited: (category, page) => {
            dispatch(getCategoryDetailFavorited(category, page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritedContainer);