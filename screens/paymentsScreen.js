import React, { useEffect,useState } from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import CollectionsCard from "../components/collectionsCard";
import KitchensPaymentsTable from "../components/kitchensPaymentsTable";
import IP from "../constants/IP";

const PaymentsScreen=()=>{

    //const [totalCollectionData,setTotalCollectionData]=useState(0);
    //const [totalDeliveryCharges,setTotalDeliveryCharges]=useState(0);
    const [paymentsRecord,setPaymentsRecord]=useState('');
    
    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/payments`)
        .then((response)=>response.json())
        .then((response)=>setPaymentsRecord(response[0]))
        .catch((error)=>console.error(error))
       
      },[]);
      
    
        return(
          <View style={styles.screen}>
             
             <CollectionsCard box1="Total Collection" box2="Delivery Charges" header="Today's Collection" totalCollection={paymentsRecord.totalCollection} totalCharges={paymentsRecord.totalItems*20}/>
               
            <View style={{alignItems:'center',paddingTop:15}}>
             <Text style={styles.headerText}>Kitchens's Payments</Text>
             </View>
             <KitchensPaymentsTable/>

          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        headerText:{
            color:Colors.primaryColor,
            fontSize:16,
            marginBottom:5,
            fontWeight:'bold'
        }, 
       
    }
)

export default PaymentsScreen;
