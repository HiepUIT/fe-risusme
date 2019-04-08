import React from 'react';
import ContentLoader from 'react-content-loader';

class ListMediaContentLoaderComponent extends React.Component {
    
    render() {
        return (
            <ContentLoader
                width={345}
                height={334}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="0" y="0" rx="3" ry="3" width="315" height="236" /> 
            </ContentLoader>
        );
    }
}

export default ListMediaContentLoaderComponent;