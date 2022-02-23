import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import AssignedStaffTable from "../components/assignedStaffTable";
import StaffInfoCard from "../components/staffInfoCard";
import { ScrollView } from "react-native-gesture-handler";
import AvailableStaffTable from '../components/availableStaffTable';
import StaffRecordTable from "../components/staffRecordTable";
import { useSelector,useDispatch } from "react-redux";
import { getStaffAvailable } from "../store/actions/adminActions";
import IP from "../constants/IP";
import { add } from "react-native-reanimated";
const StaffScreen=()=>{

    const [refreshing, setRefreshing] = useState(true);
    const [availableStaff,setAvailableStaff]=useState([]);
    const [availableStaffData,setAvailableStaffData]=useState([]);

    const dispatch=useDispatch();
    const availableStaffRecord=useSelector(state=>state.admin.StaffAvailable);
    const StaffRecord=useSelector(state=>state.admin.Staff);
    /*
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
       
      },[refreshing]);*/

      useEffect(()=>{ 
        fetch(`http://${IP.ip}:3000/staff/staffData/available`)
        .then((response)=>response.json())
        .then((response)=>dispatch(getStaffAvailable(response)))
        .catch((error)=>console.error(error))
        .finally(()=>setRefreshing(false))
        },[refreshing]);


        const prepareAvailableStaffForTable=(staff)=>{
            const tempArray=[];
            staff.map((row)=>{
                let staffId=row.staff_id;
                let name=row.firstname;
                 let phone=row.contact;
                 let newRow=[staffId,name,phone];
                tempArray.push(newRow);  
             }) 
            console.log(tempArray);       
            return tempArray;
        }

        const prepareAllStaffForTable=(staff)=>{
            const tempArray=[];
            staff.map((row)=>{
                let staffId=row.staff_id;
                let name=row.firstname;
                 let phone=row.contact;
                 let salary=row.salary;
                 let address=row.address;
                 let newRow=[staffId,name,phone,salary,address];
                tempArray.push(newRow);  
             }) 
            console.log(tempArray);       
            return tempArray;
        }
    

    
        return(
          <View>

            <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Staff Record</Text>
            </View>
            <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}
            >
              <View style={{paddingHorizontal:10,flex:1}}>
              <StaffRecordTable tableContent={prepareAllStaffForTable(StaffRecord)}/>
              </View>
            </ScrollView>
              
              <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Available Staff</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}>
              {/*<AssignedStaffTable tableData={assignedStaffData}/>*/}
              <View style={{paddingHorizontal:10,flex:1}}>
              <AvailableStaffTable tableContent={prepareAvailableStaffForTable(availableStaffRecord)}/>
              </View>
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
