import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import RequestCard from "../components/requestCard";
import IP from "../constants/IP";


const NotificationsScreen=(props)=>{

    const [pendingRequests,setPendingRequests]=useState([]);
        const [isRefreshing,setRefreshing]=useState(true);

        useEffect(()=>{

            fetch(`http://${IP.ip}:3000/chef/requests/getPendingRequests`)
            .then((response)=>response.json())
            .then((response)=>setPendingRequests(response))
            .catch((error)=>console.error(error))
            .finally(()=>setRefreshing(false));
        },[isRefreshing])


    const renderRequestCard=(itemData)=>{ 
        
        return(
            <RequestCard
            firstname={itemData.item.firstname}
            lastname={itemData.item.lastname}
            kitchen={itemData.item.kitchen_name}
            onSelect={()=>{
                props.navigation.navigate({
                    routeName:'RequestDetail',
                    params:{ 
                      phone:itemData.item.phone
                  }
                })
            }}       
            />
        )
      }


    
        return(
          <View style={styles.screen}>
              <View style={styles.requestsContainer}>
              {/* <RequestCard firstname="Rehan" lastname="Ali" kitchen="Ta'am Khana" onSelect={()=>{
                  props.navigation.navigate('RequestDetail')
              }}/> */}
              <FlatList data={pendingRequests} renderItem={renderRequestCard} keyExtractor={(item)=>item.kitchen_name}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={()=>{setRefreshing(true)}}/>}
            />
              </View>
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            
        },
        requestsContainer:{
            width:'100%',
            alignItems:'center',
            paddingHorizontal:5,
            //marginHorizontal:10,

        }
       
    }
)

export default NotificationsScreen;
