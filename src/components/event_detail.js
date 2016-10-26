import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class EventDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.link}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.link}>Full Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <Text>Event Detail</Text>
                    <Text>{this.props.title}</Text>
                    <Text>{this.props.description}</Text>
                    <Text>{this.props.img}</Text>
                    <Text>{this.props.url}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    body: {
        flex: 19
    },
    link: {
        color: 'blue'
    }
});
