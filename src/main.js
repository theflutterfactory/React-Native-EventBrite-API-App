import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView
} from 'react-native';
import Geocoder from 'react-native-geocoder';

//Normally wouldn't store my token this way if this were a production app :)
const API_TOKEN = 'Bearer 4H6ELX745M6BUM6W7A4C';
const SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([
                {
                    name: {
                        text: 'Event 1'
                    },
                    url: 'www.randomurl.com'
                }
            ])
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

    renderRow(rowData) {
        return (
            <View>
                <Text>
                    {rowData.name.text}
                </Text>
                <Text>
                    {rowData.url}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Event Search</Text>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this.renderRow(rowData)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        flex: 1
    },
    title: {
        flex: 1,
        marginTop: 40
    }
});
