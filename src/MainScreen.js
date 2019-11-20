import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import WeatherBox from './component/WeatherBox'
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';

export default class MainScreen extends Component{
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('user')
        this.state ={
            isSwitchTurnOn: true,
            user: null,
            weatherIcon : "",
            weatherText : "",
            temperature : null,
            location: null, 
        };
    }
    //랜더되기 전의 실행되는 메소드이다.
    componentDidMount(){
        const user = firebase.auth().currentUser;
        if(user) {
            this.setState({user:user._user.email});
        }
        else{
            console.log('no user');
        }
    }
    handleWeatherBox= () => {
        
        Geolocation.getCurrentPosition((position) =>{
            console.log(position)
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            let key ="45d87e9ceccfc1d95b921cc43d01802d";        
            let URL = "http://api.weatherstack.com/current?access_key="+key+"&query="+lat+","+lng;
            //http://api.weatherstack.com/current?access_key=45d87e9ceccfc1d95b921cc43d01802d&query=50,50
            fetch(URL)
            .then(res=> res.json())
            .then((data)=>{
                console.log(data);
                this.setState({
                    weatherIcon: data.current.weather_icons[0],
                    weatherText: data.current.weather_descriptions[0],
                     temperature: data.current.temperature,
                     location: data.location.name,
                })
            })
        })

    }

    onTouchSwitch=()=>{
        this.setState({isSwitchTurnOn: !this.state.isSwitchTurnOn})
        this.ref.doc(this.state.user).collection('switch-status').add({
            isSwitchTurnOn: this.state.isSwitchTurnOn,
            time: firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    render(){
        return (
            <View style= {styles.container}>
                <Text style={styles.description}>REMOTE {"\n"}SWITCH</Text>
                <TouchableOpacity
                    onPress={ ()=> this.props.navigation.navigate("Setting")}
                />
                <View style = {styles.iconContainer}>              
                <TouchableOpacity
                    onPress ={()=> this.props.navigation.navigate('Setting')}
                >
                    <AntDesign name="bells" color="#916FF2" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress ={()=> this.props.navigation.navigate('Setting')}
                >
                    <AntDesign name="setting" color="#916FF2" size={30}/>
                </TouchableOpacity>
                
                </View>
                <TouchableOpacity
                onPress = {this.handleWeatherBox}
                >
                <WeatherBox
                    weatherIcon = {this.state.weatherIcon}
                    temperature={this.state.temperature}
                    weather={this.state.weatherText}
                    location={this.state.location}
                />
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={this.onTouchSwitch}
                >
                    <Image
                    source={
                        this.state.isSwitchTurnOn
                        ? require('./on.png')
                        : require('./off.png')} 
                    style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DBDBDB'
    },
    icon:{
        width: 185,
        height: 300,
        marginTop: 30,
    },
    description:{
        fontSize:16,
        color: '#5B5A5A',
        textAlign:'center',
        marginBottom: 40,
    },
    iconContainer:{
        flexDirection: 'row',
        position:'absolute',
        top: 60,
        right: 20,
    },
});