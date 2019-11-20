import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import FooterButton from './component/FooterButton';
import firebase from 'react-native-firebase';
import Toast from 'react-native-easy-toast'

export default class SignupScreen extends Component{

    constructor(props){
        super(props);
        this.ref= firebase.firestore().collection('user')
        this.state = {
            email: 'email',
            password: 'pw',
            loading: false,
        }
    }
    //계정만드는 부분
    //then은 프로미스이다. 실행이 완료되면 다음 것을 실행하고
    //에러가 난다면 캐치로 가는 것이다.
    handleSignUp=()=>{
        this.setState({loading:true});
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
        this.setState({loading:false})
         this.props.navigation.navigate('Main')
         this.ref.doc(this.state.email).set({id:this.state.email})
        //this.ref.add({id:this.state.email})
        })
        .catch(() =>{ 
            this.setState({loading:false})
            this.refs.toast.show('이메일 형식확인,비밀번호 6자 이상',500)
        })
        //저긴 ref고 여긴 refs로 써야함
    }

    render(){
        return (
            <View style ={styles.container}>
                <Text style= {styles.switchText}>SWITCH{"\n"}계정 만들기</Text>
                <TextInput
                style = {styles.textInputButton}
                onChangeText={(email) => this.setState({email})}
                placeholder={this.state.email}
                autoCorrect={false}
                />                
                
                <TextInput
                style = {styles.textInputButton}
                onChangeText={(password) => this.setState({password})}
                placeholder={this.state.password}
                autoCorrect={false}
                secureTextEntry={true}
                />
                <Text style={styles.descriptionText}>회원가입 시 이용약관에 동의한 것으로 간주합니다.</Text>
                
                {
                    this.state.loading
                    ?<ActivityIndicator size='small' style={styles.signButton}/>
                    :<FooterButton
                    style={styles.signButton}
                    buttonText = "회원 가입"
                    onPress= {this.handleSignUp}
                />
                }

                <Toast ref='toast'/>
            </View>

        );
    }

}

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DBDBDB',
    },
    switchText:{
            fontSize:16,
            color : '#5B5A5A',
            marginTop: 41,
            textAlign: 'center',
            marginBottom: 115,
    },
    textInputButton:{
        width: 200,
        borderColor : 'gray',
        paddingVertical: 10,
        borderWidth: 0.3,
        paddingHorizontal: 5,
        borderRadius: 2,
        backgroundColor: 'white',
        height : 50,
    },
    descriptionText:{
        marginTop: 20,
        fontSize: 12,
        color: '#5B5A5A',
        fontWeight: '200',
    },
    signButton:{
        marginTop: 97.5,
    }
    
});