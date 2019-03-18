import React from 'react';
import {connect} from 'react-redux';
import CategoryDetailComponent from './../components/CategoryDetailComponent';
import * as config from './../configs/configs';
import {getCategoryDetailNew} from './../actions/actions';

class NewContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCategoryDetailNew(config.CATEGORYID_NEW, 1);
    }

    render() {
        var {categoryDetails} = this.props;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    NewContainer
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
        getCategoryDetailNew: (category, page) => {
            dispatch(getCategoryDetailNew(category, page));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NewContainer);