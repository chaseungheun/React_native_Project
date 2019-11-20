import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
}from 'react-native';

import FooterButton from './component/FooterButton'

import firebase from 'react-native-firebase';
import Toast from 'react-native-easy-toast'
import { thisTypeAnnotation } from '@babel/types';
export default class LoginScreen extends Component {
    
    constructor(props){
        super(props);
        this.state={
                idText: '이메일',
                pwText: '비밀번호',
                id: '',
                pw: '',
                loading: false,
        }
    }

    handleLogin=()=>{
        const {id, pw} = this.state;
        this.setState({loading:true});
        //id =this.state.id; 와 같다
        firebase
        .auth()
        .signInWithEmailAndPassword(id,pw)
        .then(()=>{
            this.props.navigation.navigate('Main')
            this.setState({loading:false})
        })
        .catch(()=>{
            this.refs.toast.show('잘못된 로그인정보',500)
            this.setState({loading:false})
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Image
                    source={require('./icon.png')}
                    style = {styles.icon}
                />
                <Text style = {styles.welcomText}>마켓잇</Text>
                <TextInput
                    style = {styles.textInputButton}
                    onChangeText = {(id)=> this.setState({id})}
                    placeholder={this.state.idText}
                    autoCorrect={false}

                />
                <TextInput
                    style = {styles.textInputButton}
                    onChangeText = {(pw)=> this.setState({pw})}
                    placeholder={this.state.pwText}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                {
                    this.state.loading
                    ? <ActivityIndicator size='small' style={styles.loginButton}/>
                    : <FooterButton
                    buttonText="로그인"
                    style = {styles.loginButton}
                    onPress ={this.handleLogin}
                    />
                }


                <Text style={styles.noAccountText}>계정이 없으신 경우</Text>
                <TouchableOpacity
                    onPress ={()=> this.props.navigation.navigate('SignUp')}
                >
                    <Text style={styles.makeAccountText}>회원 가입</Text>
                </TouchableOpacity>
                <Toast ref='toast'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: "#DBDBDB",
    },
    icon :{
        width: 60,
        height: 60,
        marginBottom: 70
    },
    welcomText:{
        fontSize:20,
        textAlign:'center',
        marginBottom:23,
    },
    textInputButton:{
        width: 288,
        borderColor: 'gray',
        paddingVertical: 10,
        borderWidth: 0.3,
        paddingHorizontal: 5,
        borderRadius: 2,
        backgroundColor: 'white',
        height:50,
    },
    loginButton:{
        width: 315,
        height: 50,
        marginTop:50,
    },
    noAccountText:{
        marginTop : 30,
        fontSize: 12,
        color: '#5B5A5A',
    },
    makeAccountText:{
        fontSize : 12,
        color: '#9013FE',
    }
});