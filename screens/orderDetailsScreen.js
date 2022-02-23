import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet, Button,TextInput,TouchableOpacity, ScrollView,Modal,ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from '../constants/Colors';
import { useSelector,useDispatch } from "react-redux";
import { updateOrderStatus,updateOrderCounts,getStaffAssigned,updateStaffStatus,getStaffAvailable } from "../store/actions/adminActions";
import ItemDetailsTable from "../components/itemsDetailsTable";

import IP from "../constants/IP";


const OrderDetailsScreen=(props)=>{

    const [showModal,setShowModal]=useState(false);
    const [refreshing,setRefreshing]=useState(true);
    const [staffId,setStaffId]=useState('');
    const [staffName,setStaffName]=useState('');
    const [returnTime,setReturnTime]=useState(0);
    const [availableStaffNames,setAvailableStaffNames]=useState([]);
    const [availableStaff,setAvailableStaff]=useState([]);
    const [subTotal,setSubTotal]=useState(0);
    const [deliveryCharges,setDeliveryCharges]=useState(0);
    const [grandTotal,setGrandTotal]=useState(0);
    const returnTimes=[15,30,45];

    const orderId=props.navigation.getParam('orderId');
    const customerId=props.navigation.getParam('customerId');
    const customerName=props.navigation.getParam('customerName');
    const chefId=props.navigation.getParam('chefId');
    const kitchenName=props.navigation.getParam('kitchenName');
    const currentStatus=props.navigation.getParam('currentStatus');
    const placedTime=props.navigation.getParam('time');

    const dispatch=useDispatch();

    const staffRecord=useSelector(state=>state.admin.Staff)


    useEffect(()=>{
            fetch(`http://${IP.ip}:3000/orderDetail/sum/${orderId}`)
            .then((response)=>response.json())
            .then((response)=>
            {setSubTotal(response[0].subTotal);
             setDeliveryCharges(response[0].totalItems*20);
             setGrandTotal(subTotal+deliveryCharges);
            })
        .catch((error)=>console.error(error))
       
      },[]);

      useEffect(()=>{
        let staffArray=[];
        fetch(`http://${IP.ip}:3000/staff/staffData/available`)
        .then((response)=>response.json())
        .then((response)=>setAvailableStaff(response))
        .then(()=>{                   
            availableStaff.map((row)=>{
                 let staffName=row.firstname;
                 staffArray.push(staffName);       
        })
        })
        .then(()=>setAvailableStaffNames(staffArray))
        .catch((error)=>console.error(error))
        .finally(()=>setRefreshing(false))
      },[refreshing]);


      ///  Function to change availability status of staff
      const changeStaffAvailabilityStatus=(staffId,availability)=>{
        let url=`http://${IP.ip}:3000/staff/updateStaff/${staffId}`;
        let data={
            status:availability,
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .catch((error)=>console.error(error));
      } 

      ///  Function to Add Staff Data in Assigned Staff Table
      const addStaffIntoAssigned=(staffId,status,deliveryTime)=>{
        let url=`http://${IP.ip}:3000/staff/staffAvailable`;
        let data={
            staffId:staffId,
            status:status,
            deliveryTime:deliveryTime,
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>getUpdatedAssigned())
        .then(()=>getUpdatedAvailable())
        .catch((error)=>console.error(error));
      } 

      const getUpdatedAssigned=async ()=>{
        await fetch(`http://${IP.ip}:3000/staff/staffAvailable/assigned`)
        .then((response)=>response.json())
        .then((response)=>dispatch(getStaffAssigned(response))) 
        .catch((error)=>console.error(error))
    }

      const getUpdatedAvailable=async ()=>{
        await fetch(`http://${IP.ip}:3000/staff/staffData/available`)
        .then((response)=>response.json())
        .then((response)=>dispatch(getStaffAvailable(response)))
        .catch((error)=>console.error(error))
      }



      /////////  Function Assigning Task
      const assignTask=(orderId,staffId,dTime)=>{
        let url=`http://${IP.ip}:3000/order/update/${orderId}`;
        let data={
            status:'ready to deliver',
            staff_id:staffId
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>dispatch(updateOrderCounts('ready to deliver')))
        .then(()=>dispatch(updateOrderStatus(orderId,'ready to deliver')))
        //.then(()=>dispatch(updateStaffStatus(staffId,0)))
        .then(()=>addStaffIntoAssigned(staffId,0,dTime))
        .then(()=>ToastAndroid.show(`Task Assigned Successfully`, ToastAndroid.SHORT))
        .catch((error)=>console.error(error))
        
      }



        return(
          <View style={styles.screen}>
              <ScrollView>
                <View style={styles.orderDetailsContainer}>
                <View style={styles.orderSubcontainer}>
                <Text style={styles.title}>Order Id: #{orderId}</Text>
                <Text style={styles.timeZone}>Time{props.orderedTime}</Text>
                </View> 
                <Text style={styles.subTitle}>Customer Name: {customerName}</Text>
                <Text style={styles.subTitle}>Customer Phone: {customerId}</Text>
                <Text style={styles.subTitle}>Kitchen Name:  {kitchenName}</Text>
                <Text style={styles.subTitle}>Kitchen Phone:  {chefId}</Text>
                <Text style={styles.subTitle}>Current Status:  {currentStatus}</Text>
                <Text style={styles.subTitle}>Orderd Placed:{placedTime}</Text>
                                

                <Text style={styles.headerText}>Items Details</Text>
                <ItemDetailsTable orderID={orderId}/>
                <View style={{...styles.orderSubcontainer,paddingTop:15}}>
                <Text style={styles.subTitle}>Sub Total</Text>
                <Text style={styles.subTitle}>Rs.{subTotal}</Text>
                </View>

                <View style={styles.orderSubcontainer}>
                <Text style={styles.subTitle}>Delivery Charges</Text>
                <Text style={styles.subTitle}>Rs.{deliveryCharges}</Text>
                </View>

                <View style={styles.orderSubcontainer}>
                <Text style={styles.title}>Grand Total</Text>
                <Text style={styles.title}>Rs.{subTotal+deliveryCharges}</Text>
                </View>

                
                <View style={{...styles.btnContainer,justifyContent:'center',paddingTop:10}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(true);
                    }}>
                <View style={{...styles.buttonContainer,width:180,padding:5}}>
                    <Text style={styles.btnTitle}>Assign Delivery Boy</Text>
                </View>
                </TouchableOpacity>
                </View>
                
             </View>
              </ScrollView> 



              <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Assign Delivery Boy</Text>
                    </View>
                    <Text style={styles.title}>Order Id: #{orderId}</Text>
                    <Text style={styles.subTitle}>Customer Name:  {customerName}</Text>
                    <Text style={styles.subTitle}>Kitchen Name:  {kitchenName}</Text>
                    <Text style={styles.subTitle}></Text>
                    <Text style={styles.subTitle}>Available Staff</Text>

                    
                    {/*<TextInput style={{...styles.inputText,borderColor:Colors.lightBlack,
                    borderWidth:1}} placeholder="Staff Id" 
                    value={staffId} onChangeText={(text)=>setStaffId(text)}
                    />*/}
                    <View style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,marginVertical:10}}>
                    <Picker
                            selectedValue={staffName}
                            style={{width:'100%'}}
                            onValueChange={(itemValue, itemIndex) => setStaffName(itemValue)}
                        >
                          <Picker.Item label={'Choose Staff'} value={'disabled'} color='#ccc' />
                          {availableStaffNames.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>) 
                            })}
                    </Picker>
                    </View>


                    <Text style={styles.subTitle}>Estimated Return Time</Text>
                        <View style={{...styles.container,borderColor:Colors.lightBlack,
                        borderWidth:1,marginVertical:10}}>
                        <Picker
                                selectedValue={returnTime}
                                style={{width:'100%'}}
                                onValueChange={(itemValue, itemIndex) => setReturnTime(itemValue)}
                            >
                            <Picker.Item label={'Choose Estimated Time'} value={'disabled'} color='#ccc' />
                            {returnTimes.map((item, index) => {
                                return (<Picker.Item label={`${item} Minutes`} value={item*100} key={index}/>) 
                                })}
                        </Picker>
                        </View>
                 
                <View style={{...styles.btnContainer,justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    const newAssigned=staffRecord.filter(staff=>staff.firstname===staffName)
                    assignTask(orderId,newAssigned[0].staff_id,returnTime);
                    console.log(`Staff Id: ${staffId}`);
                    setShowModal(false);
                    props.navigation.goBack();
                    }}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Assign</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </View>
            </Modal>

          </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        container: {
            
            alignItems:'center',
            //borderWidth:0.5,
            backgroundColor: '#F5FCFF',
            height:45,
            borderRadius:10
          },
        notificationCard:{
            width:'95%',
            backgroundColor:'#f5f5f5',
            borderRadius:15,
            elevation:5,
           paddingTop:10,
           paddingHorizontal:5,
           paddingBottom:5,
            overflow:'hidden',
            marginVertical:5,
            marginHorizontal:10
          
       },  
       orderHeader:{
           justifyContent:'center',
           alignItems:'center'
       }, 
       headerText:{
           color:Colors.primaryColor,
           fontSize:16,
           marginBottom:5,
           fontWeight:'bold'
       }, 
       orderDetailsContainer:{

            padding:20,
            paddingTop:10,
       },
   
       inputText:{
        marginHorizontal:5,
        marginBottom:10,
        //borderWidth:0.5,
        backgroundColor: '#F5FCFF',
        padding:5,
        paddingHorizontal:10,
        borderRadius:10,
        fontSize:14
    },
   
       
       title:{
           fontSize:16,
           fontWeight:"bold",
           color:'#000'
       },
       timeZone:{
           fontSize:16,
           color:Colors.lightBlack
       },
       subTitle:{
           fontSize:16,
           color:"#000"
       },
       orderSubcontainer:{
           flexDirection:'row',
           justifyContent:'space-between'
       },
       buttonContainer:{
           backgroundColor:Colors.primaryColor,
           justifyContent:'center',
           alignItems:'center',
           padding:3,
           width:100,
           marginHorizontal:5,
           marginBottom:5,
           borderRadius:10
       },
       btnContainer:{
           flexDirection:'row',
           justifyContent:'flex-end',
           
       },
       btnTitle:{
           color:Colors.whiteColor,
           fontSize:16,
       }
       
    }
)

export default OrderDetailsScreen;
