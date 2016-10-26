import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ListView,
    Image,
    Platform,
    TouchableOpacity,
    Navigator
} from 'react-native';
import Geocoder from 'react-native-geocoder';
import EStyleSheet from 'react-native-extended-stylesheet';

EStyleSheet.build();

//Normally wouldn't store my token this way if this were a production app :)
const API_TOKEN = 'Bearer 4H6ELX745M6BUM6W7A4C';
const SEARCH_URL = 'https://www.eventbriteapi.com/v3/events/search/';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1!==r2});

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            eventType: '',
            city: ''
        };
    }

    searchEvents(category, city) {
        Geocoder.geocodeAddress(city).then(geoCodeResponse => {
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
                this.setState({dataSource: ds.cloneWithRows(responseJSON.events)});
            });
        }).catch((err) => console.log('Error', err));
    }

    renderRow(rowData) {
        const defaultImage = 'https://pixabay.com/static/uploads/photo/2015/02/13/09/47/question-634903__180.png';
        let image = rowData.logo ? rowData.logo.url : defaultImage;

        return (
            <View style={styles.row}>
                <Image style={styles.rowLogo}
                    source={{uri: image}}/>
                <View style={styles.rowDetails}>
                    <Text>
                        {rowData.name.text.length > 30 ?
                            `${rowData.name.text.substring(0,30)}...` :
                            rowData.name.text
                        }
                    </Text>
                    <TouchableOpacity onPress={() => this.showDetails(rowData)}>
                        <Text style={styles.link}>more details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    showDetails(rowData) {
        this.props.navigator.push({
            name: 'eventDetail',
            title: rowData.name.text,
            description: rowData.description.text,
            url: rowData.url,
            img: rowData.logo.url
        });
    }

    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={sectionID + rowID} />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Event Search</Text>
                <View style={styles.form}>
                    <TextInput style={styles.input}
                        placeholder='kind of event...'
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.setState({eventType: text})}/>
                    <TextInput style={styles.input}
                        placeholder='city...'
                        onChangeText={(text) => this.setState({city: text})}/>
                </View>
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() =>
                    this.searchEvents(this.state.eventType, this.state.city)}>
                    <Text style={styles.button}>Search</Text>
                </TouchableOpacity>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    enableEmptySections={true}
                    renderSeparator={this.renderSeparator}
                    renderRow={(rowData) => this.renderRow(rowData)}/>
            </View>
            );
        }
    }

    const styles = EStyleSheet.create({
        container: {
            flex: 1,
        },
        list: {
            flex: 10
        },
        title: {
            flex: 2,
            textAlign: 'center',
            fontSize: 50,
            marginTop: 20,
            fontFamily: 'MerryChristmasFlake'
        },
        form: {
            flex: 4
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10
        },
        rowDetails: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center'
        },
        rowLogo: {
            flex: 1,
            width: 50,
            height: 50,
            borderColor: 'black',
            borderWidth: 1,
            resizeMode: 'contain'
        },
        input: {
            flex: 1,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'black',
            margin: 10,
            textAlign: 'center',
            fontSize: 16
        },
        buttonContainer: {
            flex: 1,
            padding: 10
        },
        button: {
            flex: 1,
            backgroundColor: 'deepskyblue',
            borderRadius: 5,
            borderColor: 'grey',
            borderWidth: 1,
            overflow: 'hidden',
            textAlign: 'center',
            padding: 10,
            color: 'white',
            fontWeight: 'bold'
        },
        link: {
            color: 'blue'
        },
        separator: {
            height: 1,
            backgroundColor: 'gray'
        }
    });
