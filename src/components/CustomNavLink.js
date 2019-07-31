import React from 'react';
import {Route, Link} from 'react-router-dom';

export default ({label, to, activeOnlyWhenExact, classNe, icon}) => {
    return (
        <Route path={to} exact={activeOnlyWhenExact} children={
            ({match}) => {
                let active = match ? ' active' : '';
                let classN = classNe + ' ' + active;
                return (
                    <Link className={classN} to={to}>
                        <i className={icon}></i> {label}
                    </Link>
                )
            }
        }/>
    )
}