import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Intro from './Intro';
import Skills from './Skills';
import Portfolio from './Portfolio';
import Contact from './Contact';

const NavRoute = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Intro} />
                <Route path="/skills" component={Skills} />
                <Route path="/portfolio" component={Portfolio} />
                <Route path="/contact" component={Contact} />
            </Switch>
        </Fragment>
    );
};

export default NavRoute;