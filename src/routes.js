import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from './components/index';
import Header from './components/header';
import Footer from './components/footer';
import Cars from './components/cars';
import Login from './components/user/login';
import Upload from './components/upload';

const Routes = () => (
    <BrowserRouter>
        <Header/>
        <main role="main" className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/cars" component={Cars} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/upload" component={Upload} />
            </Switch>
        </main>
    </BrowserRouter>
)

export default Routes;