import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import OrderCardOrders from "../components/orderCardOrdersScreen";


const OrdersScreen=(props)=>{

    
        return(
          <View style={styles.screen}>
              <OrderCardOrders notDelivered onSelect={()=>{
                  props.navigation.navigate({
                    routeName:'OrderDetails',
                    });
              }}/>
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        }
       
    }
)

export default OrdersScreen;
