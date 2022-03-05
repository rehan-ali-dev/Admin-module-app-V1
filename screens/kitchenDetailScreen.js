import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';;
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import FoodItem from "../components/foodItem";
import KitchenCard from "../components/kitchenCard1";
import IP from "../constants/IP";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const KitchenDetailScreen=(props)=>{

        const[isLoading,setLoading]=useState(true);
        //const[dishes,setDishes]=useState([]);

        const kitchenName=props.navigation.getParam('kitchenName');
        const allDishes=useSelector(state=>state.admin.Dishes);
        const dishes=allDishes.filter(dish=>dish.kitchen_name===kitchenName);

        /*
        useEffect(()=>{
        const kitchenName=props.navigation.getParam('kitchenName');
        fetch(`http://${IP.ip}:3000/dish/kitchen/${kitchenName}`)
        .then((response)=>response.json())
        .then((response)=>setDishes(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
        },[]);*/

        //const kitchenName=props.navigation.getParam('kitchenName');
        const kitchenLogo=props.navigation.getParam('kitchenLogo');
        const startTime=props.navigation.getParam('startTime');
        const endTime=props.navigation.getParam('endTime');


        const renderFoodItem=(itemData)=>{
            return(
               <FoodItem title={itemData.item.dish_name} imageUrl={`http://${IP.ip}:3000/images/${itemData.item.image}`} kitchenName={itemData.item.kitchen_name}
                price={itemData.item.price}
                onSelect={()=>{   
                    props.navigation.navigate({ 
                        routeName:'FoodDetail',
                        params:{
                            mealId:itemData.item.dish_id,
                            kitchenName:itemData.item.kitchen_name,
                            mealData:dishes
                        }
                    });
                   }
                }/>
            )
        }

    
        return(
            <View style={styles.container}>
                <View style={styles.kitchenContainer}>
              <KitchenCard kitchenName={kitchenName} kitchenLogo={kitchenLogo} startTime={startTime}
            endTime={endTime}/>
            </View>
            {dishes.length>0 &&
            <FlatList data={dishes} renderItem={renderFoodItem} keyExtractor={(item)=>item.dish_id}
            showsVerticalScrollIndicator={false}/>
            }
            </View>
        )
    };


const styles=StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            height:'100%'
          
        },
        kitchenContainer:{
           width:'100%',
           backgroundColor:Colors.primaryColor,
           paddingVertical:5
          
        }
       
    }
)

export default KitchenDetailScreen;
