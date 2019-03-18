import React from 'react';
import {connect} from 'react-redux';
import {getCategoryDetail} from '../actions/actions';
import CategoryDetailComponent from '../components/CategoryDetailComponent';

class CategoryDetailContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, 1);
    }

    componentDidUpdate(preProps) {
        if(preProps.match.params.id == this.props.match.params.id)
            return;
        let categoryId = this.props.match.params.id;
        this.props.getCategoryDetail(categoryId, 1);
    }

    render () {
        var { categoryDetails } = this.props;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    Animal container
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
        getCategoryDetail: (categoryId, page) => {
            dispatch(getCategoryDetail(categoryId, page));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailContainer);