import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';


const OrdersScreen=()=>{

    
        return(
          <View style={styles.screen}>
              <Text>Orders Screen</Text>
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }
       
    }
)

export default OrdersScreen;
