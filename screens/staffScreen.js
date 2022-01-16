import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import AssignedStaffTable from "../components/assignedStaffTable";
import StaffInfoCard from "../components/staffInfoCard";
import { ScrollView } from "react-native-gesture-handler";

const StaffScreen=()=>{

    
        return(
          <View>
              
              <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Assigned Staff</Text>
            </View>
            <ScrollView>
              <AssignedStaffTable/>
            </ScrollView>
            <View>
            <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Staff Record</Text>
            </View>
                <StaffInfoCard available/>
            </View>
             
          </View>
        )
    };


const styles=StyleSheet.create(
    {
       
        staffHeader:{
            justifyContent:'center',
            alignItems:'center',
            paddingVertical:10,
        }, 
        staffHeaderText:{
            color:Colors.primaryColor,
            fontSize:16,
            fontWeight:'bold'
        }, 
       
       
    }
)

export default StaffScreen;
