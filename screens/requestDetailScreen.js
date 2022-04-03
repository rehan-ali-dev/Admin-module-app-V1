import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Linking,
  Platform,
  Modal
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/Colors"
import IP from "../constants/IP"
import { MaterialIcons } from '@expo/vector-icons'; 

const RequestDetailScreen = (props) => {


    const [requestData,setRequestData]=useState({});
    const [isRefreshing,setRefreshing]=useState(true);
    const phoneNo=props.navigation.getParam('phone');
    const [showModal,setShowModal]=useState(false);
    const [reqState,setReqState]=useState('');

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/chef/requests/getReqDetails/${phoneNo}`)
            .then((response)=>response.json())
            .then((response)=>setRequestData(response[0]))
            .catch((error)=>console.error(error))
            .finally(()=>setRefreshing(false));
    },[isRefreshing])


    const rejectHandler=()=>{
        let trimNum = phoneNo.substring(1);
        let numForQuery='92'+trimNum;
        let url=`http://${IP.ip}:3000/sendMessage`;
        let data={
            phone:numForQuery,
            message:`Your request has been reviewed\nThank you for the effort and time you invested in your application\n But unfortunately we can't approve your request for certain reason\n Thanks`
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show("Message Sent", ToastAndroid.SHORT))
        .then(()=>props.navigation.navigate('Home'))

    }

    const approveHandler=()=>{
        let trimNum = phoneNo.substring(1);
        let numForQuery='92'+trimNum;
        addNewChef().then(()=>{
            addNewKitchen().then(()=>{
                deleteRequest().then(()=>{
                    let url=`http://${IP.ip}:3000/sendMessage`;
                    let data={
                    phone:numForQuery,
                    message:`Your request has been reviewed\n We are very happy to announce that your request has been approved. Your kitchen is live now add delicious dishes for foodies.\n  \n\nKindly change the password by clicking on forget password\n Thanks\nCredentials:\nPhone: ${phoneNo}\nPassword:user123`
                }
            fetch(url,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(data)
            }).then((response)=>response.json())
            .then(()=>ToastAndroid.show("Message Sent", ToastAndroid.SHORT))
            .then(()=>props.navigation.navigate('Home'))
                })
            })
            })

    }

    const openDialer=(phone)=>{
        if(Platform.OS==='android'){
            Linking.openURL(`tel:${phone}`)
        }
        else{
            Linking.openURL(`telprompt:${phone}`)
        }
    }


    const addNewChef=async ()=>{
        let url=`http://${IP.ip}:3000/chef/addChef`;
        let data={
            chefId:requestData.phone,
            firstname:requestData.firstname,
            lastname:requestData.lastname,
            phone:requestData.phone,
            cnic:requestData.cnic,
            email:requestData.email,
            password:"user123",
            city:requestData.city,
            locality:requestData.locality,
            address:requestData.address    
        }
       await fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show("Chef Added", ToastAndroid.SHORT))

    }

    const addNewKitchen=async ()=>{
        let url=`http://${IP.ip}:3000/chef/addKitchen`;
        let data={
            kitchen_name:requestData.kitchen_name,
            chefId:requestData.phone,
            start_time:requestData.start_time,
            end_time:requestData.end_time,
            logo:requestData.logo      
        }
        await fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>ToastAndroid.show("Kitchen Added", ToastAndroid.SHORT))

    }

    const deleteRequest=async ()=>{
        let url=`http://${IP.ip}:3000/chef/deleteRequest`;
                let data={
                    phone:requestData.phone
                }
               await fetch(url,{
                    method:'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body:JSON.stringify(data)
                }).then((response)=>response.json())
                .then((response)=>console.log(response))
                .then(()=>console.log("Item Deleted"))
    }


  return (
    <View style={styles.screencontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profilecontainer}>
          <View style={styles.profileview}>

            <ImageBackground source={{ uri:`http://${IP.ip}:3000/images/no_logo.png` }} style={styles.image}>
            </ImageBackground>
          </View>
        </View>

        {/* kitchen name view */}
        <Text style={styles.fieldsname}>Kitchen Name</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.kitchen_name}</Text>

        <Text style={styles.fieldsname}>Chef Name</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.firstname} {requestData.lastname}</Text>

        {/*contact view */}
        <Text style={styles.fieldsname}>Contact</Text>
        <View style={styles.contactContainer}>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.phone}</Text>
        <TouchableOpacity onPress={()=>{
            openDialer(requestData.phone)
        }} style={{flexDirection:'row'}}>
        
        <MaterialIcons name="add-call" size={22} color={Colors.primaryColor} />
        <Text style={{...styles.kitchenname,fontSize:16,color:Colors.primaryColor}}>Call</Text>
        </TouchableOpacity>
        </View>

        {/*CNIC view */}
        <Text style={styles.fieldsname}>CNIC</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.cnic}</Text>

        {/* city view*/}
        <Text style={styles.fieldsname}>City</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.city}</Text>

        {/* Locality View */}
        <Text style={styles.fieldsname}>Locality</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.locality}</Text>

        {/*address view */}
        <Text style={styles.fieldsname}>Address</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.address}</Text>

        {/*Cusines view */}
        <Text style={styles.fieldsname}>Cuisines Expertise</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.cuisines}</Text>

        {/*Dishes view */}
        <Text style={styles.fieldsname}>Dish Specialities</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.dishes}</Text>

        {/*StartTime view */}
        <Text style={styles.fieldsname}>Start Time</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.start_time}</Text>

        {/*EndTime view */}
        <Text style={styles.fieldsname}>End Time</Text>
        <Text style={{...styles.kitchenname,fontSize:14,color:Colors.lightBlack}}>{requestData.end_time}</Text>

        {/* //Buttons Container */}

        <View style={styles.btnContainer}>
                <TouchableOpacity 
                //onPress={rejectHandler}
                onPress={()=>{
                  setReqState('Reject');
                  setShowModal(true);
              }}
                >
                    <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor}}>
                        <Text style={styles.btnTitle}>Reject</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                //onPress={approveHandler}
                onPress={()=>{
                    setReqState('Accept');
                    setShowModal(true);
                }}
                >
                    <View style={{...styles.buttonContainer}}>
                        <Text style={styles.btnTitle}>Approve</Text>
                    </View>
                </TouchableOpacity>
        </View>

      </ScrollView>
      <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:120,borderRadius:10,padding:10}}>
                    <Text style={{...styles.title,fontSize:14}}>Are you sure to {reqState} this request?</Text>
                  
                {/*<OrderDetailsTable orderID={selectedOrderId}/>*/}   
                <View style={{...styles.btnContainer,justifyContent:'flex-end'}}>
               
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor,paddingHorizontal:10,borderRadius:10}}>
                    <Text style={{...styles.btnTitle,fontSize:14}}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    if(reqState==='Accept'){
                      approveHandler();
                    
                    }
                    else if(reqState==='Reject'){
                      rejectHandler();
                    }
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryColor,paddingHorizontal:10,borderRadius:10}}>
                    <Text style={{...styles.btnTitle,fontSize:14}}>{reqState}</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </View>
            </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  screencontainer: {
    paddingHorizontal: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  profilecontainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileview: {
    height: 160,
    width: 160,
    // marginLeft: "25%",
    elevation: 1,
    marginTop: 20,
    borderRadius: 80,
    marginTop: 30,

    overflow: "hidden",
  },

  image: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    borderRadius: 125,
  },
  camera: {
    alignItems: "center",

    paddingVertical: 7,
    width: "100%",
    height: 50,
  },

  contactContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',

  },
  // chefdetails: {
  //   paddingHorizontal: 20,
  //   // flexDirection: "row",
  //   // alignItems: "center",
  //   marginTop: 50,
  //   // justifyContent: "space-around",
  // },
  kitchenname: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
  },
  fieldsname: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontWeight: "bold",
    marginTop:10,
    justifyContent: "flex-start",
  },
  
  

  buttonContainer:{
    backgroundColor:Colors.primaryColor,
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    width:100,
    margin:5,
    borderRadius:10
},
btnContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    
},
btnTitle:{
    color:Colors.whiteColor,
    fontSize:16,
}
})
export default RequestDetailScreen
