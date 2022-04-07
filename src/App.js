import './App.css';
import './landingPage.css';
import React from 'react';

import HeaderComponent from "./Header.component.";
import FooterComponent from "./Footer.component";

import MyRouter from "./myRouter";
// dummy data to push images, please delete this comment if you see it //:debug
function App() {
    return (
        <>
            <HeaderComponent/>
            <div id="page-container">
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root" className="App App-header">
                    <MyRouter />
                </div>
            </div>
            <FooterComponent/>
        </>
    );
}

export default App;