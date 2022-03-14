import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import KitchenCard from "../components/kitchenCard1";
import IP from "../constants/IP";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDishesData } from "../store/actions/adminActions";


const KitchensScreen=(props)=>{
    const [isLoading,setLoading]=useState(true);
    const [kitchensData,setkitchensData]=useState([]);
    const [dishesData,setDishesData]=useState([]);

    const dispatch=useDispatch();


    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/kitchen/kitchenData/all`)
        .then((response)=>response.json())
        .then((response)=>setkitchensData(response))
        .catch((error)=>console.error(error))
      },[]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/dish`)
        .then((response)=>response.json())
        .then((response)=>dispatch(getDishesData(response)))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false))
    },[isLoading])

      const renderKitchenCard=(itemData)=>{
        return(
           <KitchenCard kitchenName={itemData.item.kitchen_name} kitchenLogo={itemData.item.logo} startTime={itemData.item.start_time}
            endTime={itemData.item.end_time}
            fname={itemData.item.firstname}
            lname={itemData.item.lastname}
            noOfDishes={itemData.item.numDishes}
            chefId={itemData.item.chef_id}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'KitchenDetail',
                    params:{
                      kitchenName:itemData.item.kitchen_name,
                      kitchenLogo:itemData.item.logo,
                      startTime:itemData.item.start_time,
                      endTime:itemData.item.end_time,
                      fname:itemData.item.firstname,
                      lname:itemData.item.lastname,
                      noOfDishes:itemData.item.numDishes,
                      chefId:itemData.item.chef_id


                    }
                });
               }
            }/>
        )
    }
    return(
       
        <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={kitchensData} renderItem={renderKitchenCard} keyExtractor={(item)=>item.kitchen_name}
            showsVerticalScrollIndicator={false}/>
            </View>
        </View>
        
        )
}
    

const styles=StyleSheet.create(
    {
    container:{
        flex:1,
        flexDirection:'column',
        height:'100%'
      
    },
    kitchenContainer:{
       width:'100%',
      
    }
       
    }
)

export default KitchensScreen;