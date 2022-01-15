import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import OrdersCard from "../components/ordersCard";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import NotificationCardHome from "../components/NotificationCardHome";
import StaffCardHome from "../components/staffCardHome";
import PendingTable from "../components/tableComponentPending";
import { ScrollView } from "react-native-gesture-handler";


const HomeScreen=()=>{


    const moveToNotifications=()=>{
        props.navigation.navigate({
            routeName:'Notifications',
        });
    }
    
        return(
          <View style={styles.screen}>
              <ScrollView>
              <OrdersCard box1="Pending" box2="Confirmed" box3="Delivered" header="Orders Summary"/>
              <NotificationCardHome notificationTitle="Hey, Come here Its order for you!!"
            customerFname="Dummy"
           // customerLname={lastName}
            orderedDish="Dummy"
            servingSize={1}
            timeOfOrder="dummy time"
            notSeen
            onSelect={()=>{}}/>
            <StaffCardHome/>
            </ScrollView>
          </View>
        )
    };

    HomeScreen.navigationOptions=navigationData=>{
        const moveNotifications=()=>{
            navigationData.navigation.navigate({
                routeName:'Notifications'
            })
        }
        return{
            headerRight: ()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="notification" iconName='ios-notifications' onPress={moveNotifications}/>
            </HeaderButtons>
        }
    }
    

const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
        }
       
    }
)

export default HomeScreen;
