import React from 'react';
import LikeDislikeComponent from './../components/LikeDislikeComponent';
import ShareComponent from './../components/ShareComponent';
import FollowComponent from './../components/FollowComponent';
import ListCommentComponent from './ListCommentComponent';
import "./../../node_modules/video-react/dist/video-react.css";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  PlayToggle,
  BigPlayButton,
  LoadingSpinner
} from 'video-react';

class MediaDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.url != prevProps.url) {
            console.log('componentDidUpdate', true);
          this.refs.player.load();
        }
    }

    render() {
        var data = this.props;
        return (
            <div className="col-lg-8 col-sm-12">
                <div className="card card-small card-post">
                    <Player ref="player"
                        playsInline
                        autoPlay
                        poster={data.image}>
                        <source src={data.url} />
                        <LoadingSpinner/>
                        <BigPlayButton position="center"/>
                        <ControlBar>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={10} order={1.2} />
                            <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5, 0.1]} order={7.1} />
                            <VolumeMenuButton />
                            <PlayToggle />
                        </ControlBar>
                    </Player>
                </div>
                <p className=" r-media-title-large">
                    {data.title}
                </p>
                <p className="row-padding">
                    by {typeof(data.author) != 'undefined' && data.author.name}
                </p>
                <div className="row row-padding row-padding-bottom">
                    <div className="col-lg-6">
                        views
                    </div>
                    <div className="col-lg-6 inline-flex">
                        <LikeDislikeComponent interactions={data.interactions}/>
                        <ShareComponent/>
                        <span className="r-detail-padding-10">&nbsp;</span>
                        <FollowComponent/>
                    </div>
                </div>
                <input type="text" className="form-control form-control-lg mb-3" placeholder="Write a comment"/>
                <p className="r-media-title-large">
                    {
                        typeof(data.comments) != 'undefined' && data.comments.length
                    } COMMENTS
                </p>
                {
                    typeof(data.comments) != 'undefined' && data.comments.map((elm, index) => {
                        return (
                            <ListCommentComponent 
                                key={index}
                                author={elm.author}
                                createdDate={elm.createdDate}
                                content={elm.content}/>
                        )
                    })
                }
            </div>
        );
    }
}

export default MediaDetailComponent;