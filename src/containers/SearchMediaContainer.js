import React from 'react';
import CategoryDetailComponent from './../components/CategoryDetailComponent';

class SearchMediaContainer extends React.Component {

    render() {
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                    Adssssssssssssss
                </div>
                <div className="row">
                    {
                        this.props.dataSearch.map((elm, index) => {
                            return (
                                    <CategoryDetailComponent
                                        key={index}
                                        id={elm.id}
                                        image={elm.image}
                                        url={elm.url}
                                        title={elm.title}
                                        author={elm.author}
                                        userInteraction={elm.userInteraction}
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


export default SearchMediaContainer;