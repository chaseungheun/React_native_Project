import React, {Component} from 'react';
import{
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

import FooterButton from './component/FooterButton'
import AntDesing from 'react-native-vector-icons/AntDesign'

import firebase from 'react-native-firebase'
import Toast from 'react-native-easy-toast'
export default class SettingScreen extends Component{

    handleSignOut = ()=>{
        firebase
        .auth()
        .signOut()
        .then(()=>{this.props.navigation.navigate('Home')})
        .catch(()=>this.refs.toast.show("오류발생",1000))
    }
    render(){
        return(
            <View style = {styles.container}>
                <TouchableOpacity
                    style={styles.arrow}
                    onPress={()=>this.props.navigation.navigate('Main')}
                >
                    <AntDesing name ="arrowleft" size={30} color="#5B5A5A"/>
                </TouchableOpacity>
                <Image
                    source = {require('./icon.png')}
                    style = {styles.icon}
                />
                <Text style={styles.currentVersionText}> 현재 버전 1.0.0</Text>
                <Text> 지원환경 IOS 7.0 이상</Text>
                <FooterButton 
                    buttonText = "로그아웃"
                    style= {styles.footerButton}
                    onPress = {this.handleSignOut}
                />
                <Text style={styles.currentVersionText}>😎원래는 웹을 하려고 했었다.</Text>
                <Toast ref='toast'/>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: '#DBDBDB',
    },
    icon:{
        width: 60,
        height: 60,
    },
    currentVersionText:{
        marginVertical: 15,
        fontSize: 12,
        color:'#5B5A5A',
    },
    footerButton:{
        marginTop: 200,
    },
    arrow:{
        position: 'absolute',
        left : 20,
        top: 50,

    }
})