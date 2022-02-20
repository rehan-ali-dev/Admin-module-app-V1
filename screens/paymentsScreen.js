import React, { useEffect,useState } from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import CollectionsCard from "../components/collectionsCard";
import KitchensPaymentsTable from "../components/kitchensPaymentsTable";
import { useSelector } from "react-redux";
import IP from "../constants/IP";
import { ScrollView } from "react-native-gesture-handler";

const PaymentsScreen=()=>{

    //const [totalCollectionData,setTotalCollectionData]=useState(0);
    //const [totalDeliveryCharges,setTotalDeliveryCharges]=useState(0);
    const [paymentsRecord,setPaymentsRecord]=useState(0);
    const [refreshing,setRefreshing]=useState(true);

    const paymentRecord=useSelector(state=>state.admin.AmountData);

    /*
    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/payments`)
        .then((response)=>response.json())
        .then((response)=>setPaymentsRecord(response[0]))
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))
       
      },[refreshing]);*/
      
    
        return(
          <View style={styles.screen}>
             <ScrollView>
             {/*refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}*/}
             <CollectionsCard box1="Total Collection" box2="Delivery Charges" header="Today's Collection" totalCollection={paymentRecord.totalCollection} totalCharges={paymentRecord.totalDeliveryCharges}/>
             {/* 
            <View style={{alignItems:'center',paddingTop:15}}>
             <Text style={styles.headerText}>Kitchens's Payments</Text>
             </View>
            
             <KitchensPaymentsTable/>
              */}
             </ScrollView>
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
