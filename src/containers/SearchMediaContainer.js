import React from 'react';
import CategoryDetailComponent from './../components/CategoryDetailComponent';

class SearchMediaContainer extends React.Component {

    render() {
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="row">&nbsp;</div>
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