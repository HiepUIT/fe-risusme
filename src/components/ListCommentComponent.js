import React from 'react';

class ListCommentComponent extends React.Component {

    render() {
        return (
            <div className="r-comment">
                <div className="card-post__author d-flex r-cmt-author-padding">
                    <img alt="" src={this.props.author.avatar} className="card-post__author-avatar card-post__author-avatar--small"/>
                    <div className="d-flex flex-column justify-content-center ml-3">
                        <span className="card-post__author-name">{this.props.author.name}</span>
                        <span className="text-muted">{this.props.createdDate}</span>
                    </div>
                </div>
                <p className="r-cmt-content">{this.props.content}</p>
            </div>
        );
    }
}

export default ListCommentComponent;