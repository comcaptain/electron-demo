import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoldenLayout from 'golden-layout';
import * as serviceWorker from './serviceWorker';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.ReactDOM = ReactDOM;
window.React = React;
let myLayout = new GoldenLayout({
    content: [{
        type: 'row',
        content:[{
            type:'react-component',
            component: 'app',
            props: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type:'react-component',
                component: 'app',
                props: { label: 'B' }
            },{
                type:'react-component',
                component: 'app',
                props: { label: 'C' }
            }]
        }]
    }]
});
myLayout.registerComponent("app", App);
myLayout.init();
window.myLayout = myLayout;