import React from 'react';
import star from './../images/favorite_home.png';
import starPress from './../images/favorite_home_press.png';
import {favoriteAction, checkAuth} from './../actions/actions';
import PopupNotificationLogin from './PopupNotificationLogin';

class FavoriteComponent extends React.Component {
    constructor(props) {
        super(props);
        let isFavorite = false;
        if(this.props.userInteraction !== undefined)
            isFavorite = this.props.userInteraction.isFavorited;
        let iconFavorite = star;
        if(isFavorite)
            iconFavorite = starPress;
        this.state = {
            isFavorite,
            iconFavorite,
            showModal: false
        }
    }

    favoriteAction = () => {
        if(!checkAuth()) {
            this.setState({showModal: true});
            return;
        }
        let isFavorite = this.state.isFavorite;
        let iconFavorite = starPress;
        if(isFavorite)
            iconFavorite = star;
        this.setState({
            isFavorite: !isFavorite,
            iconFavorite
        });
        favoriteAction(this.props.mediaId);
    }

    render() {
        return (
            <div className="text-right">
                <img alt="" onClick={this.favoriteAction} className="r-detail-img-icon" src={this.state.iconFavorite}/>
                <PopupNotificationLogin showModal={this.state.showModal}/>
            </div>
        )
    }
}

export default FavoriteComponent;