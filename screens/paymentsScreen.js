import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import CollectionsCard from "../components/collectionsCard";
import KitchensPaymentsTable from "../components/kitchensPaymentsTable";

const PaymentsScreen=()=>{

    
        return(
          <View style={styles.screen}>
             
             <CollectionsCard box1="Total Payment" box2="Delivery Charges" header="Today's Collection"/>
               
            <View style={{alignItems:'center',paddingTop:15}}>
             <Text style={styles.headerText}>Items Details</Text>
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
