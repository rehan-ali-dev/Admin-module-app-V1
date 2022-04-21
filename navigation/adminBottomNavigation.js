import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import React from 'react';
import { Platform } from 'react-native';

import HomeScreen from '../screens/homeScreen';
import OrdersScreen from '../screens/ordersScreen';
import PaymentsScreen from '../screens/paymentsScreen';
import KitchensScreen from '../screens/kitchensScreen';
import KitchenDetailScreen from '../screens/kitchenDetailScreen';
import NotificationsScreen from '../screens/notificationsScreen';
import RequestDetailScreen from '../screens/requestDetailScreen';
import StaffScreen from '../screens/staffScreen';
import OrderDetailsScreen from '../screens/orderDetailsScreen';
import LoginScreen from '../screens/loginScreen';
import PlanListScreen from '../screens/plansListScreen';
import WeeklyPlanDetailsScreen from '../screens/weeklyPlanDetailsScreen';


const defaultNavConfiguration= {
    //set Default Configuration
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white',
        
    }
}

const HomeNavigator=createStackNavigator(
    {
        Home: HomeScreen,
        Notifications:NotificationsScreen,
        RequestDetail:RequestDetailScreen,
        WeeklyPlanDetails:WeeklyPlanDetailsScreen,
        PlansList:PlanListScreen
    },defaultNavConfiguration
);

const OrdersNavigator=createStackNavigator(
    {
        Orders:OrdersScreen,
        OrderDetails: OrderDetailsScreen,    
    },defaultNavConfiguration
);

const KitchensNavigator=createStackNavigator(
    {    
        Kitchens:KitchensScreen,
        KitchenDetail:KitchenDetailScreen,
    },defaultNavConfiguration
);

const PaymentsNavigator=createStackNavigator(
    {  
       Payments:PaymentsScreen,
    },defaultNavConfiguration
);

const StaffNavigator=createStackNavigator(
    {      
        Staff:StaffScreen,
    },defaultNavConfiguration
);


const navigationConfiguration={
    Orders:{
        screen:OrdersNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (
                    <MaterialCommunityIcons name="notebook-multiple" size={24} color={tabInfo.tintColor} />)
            }
        },
    },
    Kitchens:{
        screen:KitchensNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Ionicons name="ios-restaurant-sharp" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Home:{
        screen:HomeNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<MaterialIcons name="dashboard" size={24} color={tabInfo.tintColor} />)
            }
        }
    },

    Payments:{
        screen:PaymentsNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<Fontisto name="wallet" size={24} color={tabInfo.tintColor} />)
            }
        }
    },
    Staff:{
        screen:StaffNavigator,
        navigationOptions:{
            tabBarIcon:(tabInfo)=>{
                return (<FontAwesome name="users" size={24} color={tabInfo.tintColor} />)
            }
        }
    }
}

const AuthNavigator=createStackNavigator(
    {  
        Login:LoginScreen,
    },defaultNavConfiguration
)



const AdminBottomNavigator=Platform.OS === 'android'
? createMaterialBottomTabNavigator(
   navigationConfiguration,{
       activeColor:Colors.primaryColor,
       inactiveColor:'#888',
       shifting:true,
       barStyle:{backgroundColor:Colors.whiteColor},
       initialRouteName:'Home'
       
   }
) 
: createBottomTabNavigator(
  navigationConfiguration,{
       tabBarOptions:{
           activeTintColor:Colors.primaryColor
       } 
   });


   const MainNavigator=createSwitchNavigator({
    Auth:AuthNavigator,
    MainHome:AdminBottomNavigator
})

export default createAppContainer(MainNavigator);