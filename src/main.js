import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

//Don't store your tokens this way in a normal production app :)
const API_TOKEN = 'Bearer 4H6ELX745M6BUM6W7A4C';
const SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        this.searchEvents('salsa dancing', 'San Francisco');
    }

    searchEvents(category, city) {
        const FETCH_URL = SEARCH_URL + '?q=' + category + '&location.address=' + city;

         console.log(FETCH_URL);

        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                'Authorization': API_TOKEN
            }
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Event Search</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
