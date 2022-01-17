import React,{useEffect,useState} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import OrdersCard from "../components/ordersCard";
import { HeaderButtons,Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/customHeaderButton";
import NotificationCardHome from "../components/NotificationCardHome";
import StaffCardHome from "../components/staffCardHome";
import PendingTable from "../components/tableComponentPending";
import { ScrollView } from "react-native-gesture-handler";
import IP from "../constants/IP";


const HomeScreen=(props)=>{


    const [isLoading,setLoading]=useState(true);
    const [pendingOrders,setPendingOrders]=useState([]);
    const [tableData,setTableData]=useState([]);
    const [pendingCounts,setPendingCounts]=useState(0);
    const [confirmedCounts,setConfirmedCounts]=useState(0);
    const [deliveredCounts,setDeliveredCounts]=useState(0);
    const [staff,setStaff]=useState([]);
    const [availableStaff,setAvailableStaff]=useState([]);
    const [staffTableData,setStaffTableData]=useState([]);


    
    

    useEffect(()=>{
        let dataArray=[];
        let staffArray=[];
        fetch(`http://${IP.ip}:3000/order`)
        .then((response)=>response.json())
        .then((response)=>setPendingOrders(response))
        .then(()=>{
            pendingOrders.map((row)=>{
                 let orderId=row.order_id;
                 let custId=row.cust_id;
                 let chefId=row.chef_id;
                 let time=row.total_amount;
                 let newRow=[orderId,custId,chefId,time];
                 dataArray.push(newRow);       
        })
        })
        .then(()=>setTableData(dataArray))
        .then(()=>{
            fetch(`http://${IP.ip}:3000/staff/available`)
        .then((response)=>response.json())
        .then((response)=>setStaff(response))
        .then(()=>{
            staff.map((row)=>{
                 let staffId=row.staff_id;
                 let name=row.firstname;
                 let phone=row.contact;
                 let newRow=[staffId,name,phone];
                 staffArray.push(newRow);       
        })
        })
        .then(()=>setStaffTableData(staffArray))
        })


        .then(()=>{
            fetch(`http://${IP.ip}:3000/orderCounts/pending`)
            .then((response)=>response.json())
            .then((response)=>setPendingCounts(response[0].pendingOrders));

            fetch(`http://${IP.ip}:3000/orderCounts/confirmed`)
            .then((response)=>response.json())
            .then((response)=>setConfirmedCounts(response[0].confirmedOrders));

            fetch(`http://${IP.ip}:3000/orderCounts/delivered`)
            .then((response)=>response.json())
            .then((response)=>setDeliveredCounts(response[0].deliveredOrders));

        })
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);

    

    const moveToNotifications=()=>{
        props.navigation.navigate({
            routeName:'Notifications',
        });
    }
    
        return(
          <View style={styles.screen}>
              <ScrollView>
              <OrdersCard pending={pendingCounts} box1="Pending" confirmed={confirmedCounts} box2="Confirmed" delivered={deliveredCounts} box3="Delivered" header="Orders Summary"/>
              <NotificationCardHome tableData={tableData}
            onSelect={()=>{}}/>
            <StaffCardHome tableData={staffTableData}/>
            </ScrollView>
          </View>
        )
    };

    HomeScreen.navigationOptions=navigationData=>{
       const moveNotifications=()=>{
            navigationData.navigation.navigate({
                routeName:'Notifications'
            })
       }
        return{
            headerRight: ()=><HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="notification" iconName='ios-notifications' onPress={moveNotifications}/>
            </HeaderButtons>
        }
    }
    

const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
        }
       
    }
)

export default HomeScreen;
