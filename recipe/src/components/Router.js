import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Footer from '../routes/Footer';
import Header from '../routes/Header';
import Home from '../routes/Home';
import RecipeList from '../routes/RecipeList';
import RecipeDetail from '../routes/RecipeDetail';

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route path="/recipelist" component={RecipeList}></Route>
                        <Route path="/recipedetail" component={RecipeDetail}></Route>
                    </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Router;