import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,ToastAndroid,Alert,RefreshControl,Modal } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getAmountData,updateKitchenPayment2 } from "../store/actions/adminActions";
import PlanNotificationCard from "../components/planNotificationCard";

import IP from '../constants/IP';


const PlanListScreen=(props)=>{

    const [plansData,setPlansData]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
    const [showModal,setShowModal]=useState(false);
    const [selectedPlanId,setSelectedPlanId]=useState('');
    const [selectedPlanName,setSelectedPlanName]=useState('');
    const [selectedcustomer,setSelectedCustomer]=useState('');
    const [selectedKitchen,setSelectedKitchen]=useState('');
    const [selectedTotal,setSelectedTotal]=useState('');

    const amountData=useSelector(state=>state.admin.AmountData);
    let particularChefData;
    const dispatch=useDispatch();


   

  
    useEffect(()=>{
      
        fetch(`http://${IP.ip}:3000/weeklyPlan/getAllSubscriptionsPlans`)
        .then((response)=>response.json())
        .then((response)=>{
            setPlansData(response);
        })
        .then(()=>console.log(plansData[0]))
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error));
      },[refreshing]);

      // Function to confirm the order
      const updateOrderAsConfirmed=async (planId)=>{
        let url=`http://${IP.ip}:3000/weeklyPlan/updateStatus/${planId}`;
        let data={
            status:'Subscribed',
        }
        await fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(planId,"Subscribed","Plan has been Confirmed Successfully!"))
        // .then(()=>dispatch(updateOrderCounts('confirmed')))
        // .then(()=>dispatch(updateOrderStatus(orderId,'confirmed')))
        
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }

      // Function to cancel the Plan
      const updateOrderAsCancelled=async (planId)=>{
        let url=`http://${IP.ip}:3000/weeklyPlan/updateStatus/${planId}`;
        let data={
            status:'Cancelled',
        }
        await fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>showAlert(planId,"Cancelled","Plan Cancelled!"))
        // .then(()=>dispatch(updateOrderCounts('cancelled')))
        // .then(()=>dispatch(updateOrderStatus(orderId,'cancelled')))
        
        //.then(()=>setRefreshing(true))
        .catch((error)=>console.error(error))   
      }

      const showAlert=(planId,status,title)=>{
        Alert.alert(`${title}`,`Weekly Plan# : ${planId}\nPlan Status: ${status}\n`,[{
            text:'Okey!',
            style:'cancel'
        }]);
    }



    const getPreviousPaymentsOfChef=async (kitchen)=>{
        await fetch(`http://${IP.ip}:3000/payments/kitchensPayments/${kitchen}`)
        .then((response)=>response.json())
        .then((response)=>{
            //setParticularChefData(response[0]))
            console.log(" // Get PRevious PAyments")
            console.log(response[0])
            particularChefData=response[0]})
        .catch((error)=>console.error(error))
      }



    const setUpdatedPayments=(kitchen,recievedPayment)=>{
        console.log("Entered")
       
        getPreviousPaymentsOfChef(kitchen).then(()=>{
            console.log("//////  Get Chef DAta  //")
            console.log(particularChefData)
          let url=`http://${IP.ip}:3000/payments/updatePayment/deliveredOrder/${kitchen}`;
          let data={
          updatedEarning:particularChefData.total_earning+recievedPayment,
          updatedPending:particularChefData.pending+recievedPayment
          }
          fetch(url,{
          method:'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
          body:JSON.stringify(data)
      }).then((response)=>response.json())
      .then(()=>{
        let amountObj={
            totalCollection:amountData.totalCollection+recievedPayment,
            totalDeliveryCharges:amountData.totalDeliveryCharges}
            console.log("// Amount Obj")
            console.log(amountObj);
            dispatch(getAmountData(amountObj))
      })

      .then(()=>dispatch(updateKitchenPayment2(kitchen,particularChefData.total_earning+recievedPayment,particularChefData.pending+recievedPayment)))
      .then(()=>console.log("Done"))
      .catch((error)=>console.error(error))   
        })
      
     
    }




       const renderNotificationCard=(itemData)=>{      
        return(
            <PlanNotificationCard
            planName={itemData.item.plan_name}
            subscriptionId={itemData.item.subscription_id}
            status={itemData.item.status}
            totalAmount={itemData.item.total}
            subscribedDate={itemData.item.subscribed_date}
            expiredDate={itemData.item.expired_date}
            kitchen={itemData.item.kitchen_name}
            forOrderScreen
            onViewDetails={()=>{
                console.log("clicked")
                props.navigation.navigate({
                  routeName: "WeeklyPlanDetails",
                  params: {
                    imgurl: itemData.item.logo,
                    planname: itemData.item.plan_name,
                    planId:itemData.item.plan_id,
                    KitchenName: itemData.item.kitchen_name,
                    price: itemData.item.total,
                    showButton:false,
                  },
                })
            }}

            onUpdate={()=>{
                setSelectedPlanId(itemData.item.plan_id);
                setSelectedPlanName(itemData.item.plan_name);
                setSelectedCustomer(itemData.item.customer_id);
                setSelectedKitchen(itemData.item.kitchen_name);
                setSelectedTotal(itemData.item.total);
                setShowModal(true);
            }}

            onSelect={()=>{
            updateOrderAsConfirmed(itemData.item.plan_id)
            .then(()=>{
                          //send notification to Admin
                        fetch('https://exp.host/--/api/v2/push/send',{
                            method:'POST',
                            headers:{
                                'Accept':'application/json',
                                'Accept-Encoding':'gzip,deflate',
                                'Content-Type':'application/json'
                            },
                            body: JSON.stringify({
                                to:itemData.item.push_token,
                                data:{
                                   
                                },
                                title:`Your Weekly Plan Confirmed`,
                                body:`New Weekly Plan has been confirmed By Admin, Administration will handle your Weekly plan`,  
                                //experienceId: "@rehan.ali/Admin-module-app-V1",
                            })
                        }).then(()=>{
                            console.log("Notification Sent to Chef")
                        })
                    })
        
          }}



           onCancel={()=>{
            updateOrderAsCancelled(itemData.item.plan_id)
            .then(()=>{
              fetch('https://exp.host/--/api/v2/push/send',{
                  method:'POST',
                  headers:{
                      'Accept':'application/json',
                      'Accept-Encoding':'gzip,deflate',
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      to:itemData.item.push_token,
                      data:{
                         
                      },
                      title:`Your Weekly Plan Cancelled`,
                      body:`Unfortunately, Administration is unable to manage your plan`,  
                    //  experienceId: "@rehan.ali/Admin-module-app-V1",
                  })
              }).then(()=>{
                  console.log("Notification Sent to Chef")
              })
          })
       
      
           }}
           />
           )
       }

    
        return(
            <View style={styles.container}>
            <View style={styles.kitchenContainer}>
            <FlatList data={plansData} renderItem={renderNotificationCard} keyExtractor={(item)=>item.plan_id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}

            showsVerticalScrollIndicator={false}/>
            </View>


            <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:30,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Update Plan Payment</Text>
                    </View>
                    <Text style={styles.title}>Plan Id: #{selectedPlanId}</Text>
                    <Text style={styles.subTitle}>Plan Name: {selectedPlanName}</Text>
                    <Text style={styles.subTitle}>Customer Name: {selectedcustomer}</Text>
                    <Text style={styles.subTitle}>Kitchen Name: {selectedKitchen}</Text>
                    <Text style={styles.subTitle}>Total Amount: {selectedTotal}</Text>
                    {/* 
                    <TextInput style={{...styles.inputText,borderColor:Colors.lightBlack,
                    borderWidth:1}} placeholder="Staff Id" 
                    value={staffId} onChangeText={(text)=>console.log(text)}
                    />*/}
                 
                <View style={{...styles.btnContainer,justifyContent:'space-between',paddingTop:10}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    
                    setShowModal(false);
                   
                   console.log("// Entering for updating Payments //")
                    setUpdatedPayments(selectedKitchen,selectedTotal);
                    ToastAndroid.show(`Payments Has Been Updated`, ToastAndroid.SHORT)
                    
                   
                    //(deliveredOrderDetails.order_id);
                    console.log("// Updated Order Status Function Executed //");                    
                    }}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Update Payment</Text>
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
        container:{
            flex:1,
            flexDirection:'column',
            height:'100%'
          
        },
        kitchenContainer:{
           width:'100%',
          
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
        buttonContainer:{
            backgroundColor:Colors.primaryColor,
            justifyContent:'center',
            alignItems:'center',
            padding:3,
            width:130,
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
       
    }
)

export default PlanListScreen;
