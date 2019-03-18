import React from 'react';
import {connect} from 'react-redux';
import {getListCategory} from './../actions/actions';
import ListCategoryComponent from './../components/ListCategoryComponent';

class ListCategoryContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getListCategory();
    }

    render() {
        let { listCategory } = this.props;
        return (
            <ul className="nav flex-column">
                {
                    listCategory.map((elm, index) => {
                        return(
                            <ListCategoryComponent
                                key={index}
                                id={elm.id}
                                imgUrl={elm.imageUrl}
                                name={elm.name}
                            />
                        )
                    })
                }
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.listCategoryReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListCategory: () => {
            dispatch(getListCategory());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListCategoryContainer)