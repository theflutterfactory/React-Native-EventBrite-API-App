import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';

export default class EventDetail extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigator.pop()}>
                        <Text style={styles.link}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.link}>Full Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <Image
                        style={styles.detailImg}
                        source={{uri: this.props.img}}/>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <ScrollView style={styles.description}>
                        <Text>{this.props.description}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    body: {
        flex: 19,
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        color: 'blue'
    },
    detailImg: {
        height: 200,
        width: 200,
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        padding: 5
    },
    description: {
        padding: 10
    }
});
