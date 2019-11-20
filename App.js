/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import LoginScreen from './src/LoginScreen';

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import SignupScreen from './src/SignupScreen';

import MainScreen from './src/MainScreen';
import SettingScreen from './src/SettingScreen';

const AppNavigation = createStackNavigator({
  Home:{
    screen: MainScreen,
    navigationOptions:{
      header: null
    }
  },
  SignUp : {
    screen : SignupScreen,
    navigationOptions:{
      header: null
    }
  },
  Main:{
    screen: MainScreen,
    navigationOptions:{
      header: null
    },
  },
  Setting: {
    screen: SettingScreen,
        navigationOptions:{
      header: null
    }
  }

});
const App = createAppContainer(AppNavigation);
export default App