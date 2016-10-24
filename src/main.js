import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Geocoder from 'react-native-geocoder';

//Normally wouldn't store my token this way if this were a production app :)
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
        Geocoder.geocodeAddress(city).then(geoCodeResponse => {
            console.log('res', geoCodeResponse);

            let position = geoCodeResponse[0].position;
            let locationString = `&location.latitude=${position.lat}&location.longitude=${position.lng}`;
            let FETCH_URL = `${SEARCH_URL}?q=${category}${locationString}`;

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
        }).catch((err) => console.log('Error', err));
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
