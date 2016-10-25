import React, { Component } from 'react';
import {
    Navigator
} from 'react-native';

import Events from './components/events';
import EventDetail from './components/event_detail';

const routes = {
    events: Events,
    eventDetail: EventDetail
};

export default class Main extends Component {
    render() {
        return (
            <Navigator initialRoute={{name: 'events'}}
                renderScene={this.renderScene}/>
        );
    }

    renderScene(route, navigator) {
        let Component = routes[route.name];
        return (
            //Pass Navigator component so child components can access it
            <Component navigator={navigator}/>
        );
    }
}
