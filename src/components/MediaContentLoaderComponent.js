import React from 'react';
import ContentLoader from 'react-content-loader';

class MediaContentLoaderComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row row-margin">
                <div className="padding-5 col-lg-9 col-sm-12">
                    <ContentLoader
                        width={1017}
                        height={1000}
                        speed={2}
                        primaryColor="#f3f3f3"
                        secondaryColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="0" ry="0" width="1017" height="505"/>
                        <rect x="0" y="515" rx="10" ry="10" width="1017" height="20"/>
                        <rect x="0" y="565" rx="10" ry="10" width="100" height="25"/>
                        <rect x="0" y="595" rx="5" ry="5" width="50" height="15" />
                        <rect x="650" y="595" rx="5" ry="5" width="367" height="15" />

                        <circle cx="20" cy="690" r="20" />
                        <rect x="50" y="675" rx="5" ry="5" width="135" height="15"/>
                        <rect x="50" y="695" rx="5" ry="5" width="150" height="10"/>
                        <rect x="0" y="715" rx="5" ry="5" width="1017" height="50"/>
                        <rect x="0" y="770" rx="5" ry="5" width="20" height="15"/>

                    </ContentLoader>
                </div>
                <div className="padding-5 col-lg-3 col-sm-12">
                    <div className="stats-small stats-small--1 card-no-border-r">
                        <div className="card-body p-0 d-flex">
                            <div className="d-flex flex-column m-auto">
                                <div className="stats-small__data text-center" >
                                    {this.props.banner}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row m-auto">
                        <ContentLoader
                            width={322}
                            height={130}
                            speed={2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="0" ry="0" width="146" height="130"/>
                            <rect x="156" y="0" rx="5" ry="5" width="166" height="15"/>
                            <rect x="156" y="20" rx="5" ry="5" width="166" height="15"/>
                        </ContentLoader>
                    </div>
                </div>
            </div>
        );
    }
}

export default MediaContentLoaderComponent;