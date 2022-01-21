import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import AssignedStaffTable from "../components/assignedStaffTable";
import StaffInfoCard from "../components/staffInfoCard";
import { ScrollView } from "react-native-gesture-handler";
import IP from "../constants/IP";
const StaffScreen=()=>{

    const [refreshing, setRefreshing] = useState(true);
    const [assignedStaff,setAssignedStaff]=useState([]);
    const [assignedStaffData,setAssignedStaffData]=useState([]);

    useEffect(()=>{
        let staffArray=[];
        fetch(`http://${IP.ip}:3000/staff/staffStatus/assigned`)
        .then((response)=>response.json())
        .then((response)=>setAssignedStaff(response))
        .then(()=>{
            assignedStaff.map((row)=>{
                 let staffId=row.staff_id;
                 let name=row.firstname;
                 let phone=row.contact;
                 let orderId=row.order_id;
                 let newRow=[staffId,name,phone,orderId];
                 staffArray.push(newRow);       
        })
        }).then(()=>setRefreshing(false))
        .then(()=>setAssignedStaffData(staffArray))
        .catch((error)=>console.error(error))
       
      },[refreshing]);


    
        return(
          <View>
              
              <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Assigned Staff</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}>
              <AssignedStaffTable tableData={assignedStaffData}/>
            </ScrollView>
            {/** 
            <View>
            <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Staff Record</Text>
            </View>
                <StaffInfoCard available/>
            </View>
            */}
             
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
