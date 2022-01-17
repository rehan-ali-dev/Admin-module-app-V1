import React,{useEffect,useState} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import IP from "../constants/IP";
import OrderCardOrders from "../components/orderCardOrdersScreen";


const OrdersScreen=(props)=>{

    const [ordersData,setOrdersData]=useState([]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/order`)
        .then((response)=>response.json())
        .then((response)=>setOrdersData(response))
        .catch((error)=>console.error(error))
       
      },[]);

    
      const renderOrderCard=(itemData)=>{     
        return(
            <OrderCardOrders
            orderId={itemData.item.order_id}
            orderBy={itemData.item.cust_id}
            orderTo={itemData.item.chef_id}
            totalAmount={itemData.item.total_amount}
            currentStatus={itemData.item.status}
            onSelect={()=>{
                props.navigation.navigate({
                  routeName:'OrderDetails',
                  params:{
                      orderId:itemData.item.order_id,
                      customerId:itemData.item.cust_id,
                      chefId:itemData.item.chef_id,
                      currentStatus:itemData.item.status,
                      time:itemData.item.time
                  }
                  });
            }}/>
        )
      }

        return(
          <View style={styles.screen}>
              <FlatList data={ordersData} renderItem={renderOrderCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}/>
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
