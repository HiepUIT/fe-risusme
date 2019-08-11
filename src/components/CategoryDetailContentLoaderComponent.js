import React from 'react';
import ContentLoader from 'react-content-loader';

class ListMediaContentLoaderComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nContent: 18
        }
    }
    
    render() {
        let content = [];
        for(let i = 0; i < this.state.nContent; i++) {
            content.push(<div key={i} className="padding-5 col-lg-2 col-md-6 col-sm-6 mb-4">
                <ContentLoader 
                    height={300}
                    width={400}
                    speed={2}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="3" ry="3" width="400" height="200" /> 
                    <rect x="0" y="208" rx="3" ry="3" width="400" height="25" />
                    <rect x="0" y="242" rx="3" ry="3" width="180" height="25"/>
                    <rect x="350" y="242" rx="3" ry="3" width="50" height="25"/>
                    <rect x="0" y="272" rx="3" ry="3" width="50" height="25"/>
                    <rect x="230" y="272" rx="3" ry="3" width="70" height="25"/>
                    <rect x="330" y="272" rx="3" ry="3" width="70" height="25"/>
                </ContentLoader>
            </div>);
        }
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="row banner-slider-ads">
                    {this.props.banner}
                </div>
                <div className="row">
                    {content}
                </div>
            </div>
        );
    }
}

export default ListMediaContentLoaderComponent;