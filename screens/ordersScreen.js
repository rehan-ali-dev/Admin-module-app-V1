import React,{useCallback, useEffect,useState} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,Modal,TextInput,Alert,RefreshControl } from "react-native";
import Colors from '../constants/Colors';
import { useDispatch,useSelector } from "react-redux";
import { updateOrderCounts,updateOrderStatus,getStaffAssigned,getAmountData,getStaffAvailable } from "../store/actions/adminActions";
import IP from "../constants/IP";
import OrdersCard from '../components/ordersCard';
import OrderCardOrders from "../components/orderCardOrdersScreen";



const OrdersScreen=(props)=>{

    const [ordersData,setOrdersData]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [deliveredOrderDetails,setDeliveredOrderDetails]=useState('');
    //const [previousSavedPayments,setPreviousSavedPayments]=useState('');
    //const [particularChefData,setParticularChefData]=useState([]);
    let particularChefData;
    let previousPaymentsRecord;
    let subTotalOfOrder;
    //const [subTotalOfOrder,setSubTotalOfOrder]=useState(0);

    const [refreshScreen,setRefreshScreen]=useState(false);
    const [refreshing,setRefreshing]=useState(false);

    const dispatch=useDispatch();

    const totalOrdersCounts=useSelector(state=>state.admin.OrdersCounts);
    const ordersList=useSelector(state=>state.admin.Orders);

    
    
      const getDeliveredOrderDetails=(orderId)=>{
        fetch(`http://${IP.ip}:3000/order/orderRecord/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>setDeliveredOrderDetails(response[0]))
        .catch((error)=>console.error(error))
      }




       /////////  Function to update the status of order 
       const updateOrderStatuses=(orderId)=>{
        let url=`http://${IP.ip}:3000/order/updateStatus/${orderId}`;
        let data={
            status:'delivered',
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>dispatch(updateOrderCounts('delivered')))
        .then(()=>dispatch(updateOrderStatus(orderId,'delivered')))
        .then(()=>console.log("// Entering in updated Paymnets"))
        .then(()=>getUpdatedPayments())
        .then(()=>sendNotificationToChef(orderId))
        .catch((error)=>console.error(error))   
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


      const setUpdatedPayments=(kitchen,orderId)=>{
          console.log("Entered")
          getOrderSubTotal(orderId).then(()=>{
              console.log("///// SubTotal OF ORder ")
              console.log(subTotalOfOrder)
          getPreviousPaymentsOfChef(kitchen).then(()=>{
              console.log("//////  Get Chef DAta  //")
              console.log(particularChefData)
            let url=`http://${IP.ip}:3000/payments/updatePayment/deliveredOrder/${kitchen}`;
            let data={
            updatedEarning:particularChefData.total_earning+subTotalOfOrder,
            updatedPending:particularChefData.pending+subTotalOfOrder
            }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>console.log("Done"))
        .catch((error)=>console.error(error))   
          })
          })
       
      }



      const getUpdatedPayments=async ()=>{
          let totalCollections;
          let totalDeliveryChargess;
          await fetch(`http://${IP.ip}:3000/payments/onlyTotalCollection`)
          .then((response)=>response.json())
          .then((response)=>{
             totalCollections=response[0].totalCollection;
          })
          .then(async ()=>{
            await fetch(`http://${IP.ip}:3000/payments/onlyTotalDeliveryCharges`)
            .then((response)=>response.json())
            .then((response)=>{
               totalDeliveryChargess=response[0].totalDeliveryCharges;
            })
          })
          .then(()=>{
            let amountObj={
                totalCollection:totalCollections,
                totalDeliveryCharges:totalDeliveryChargess}
                console.log("// Amount Obj")
                console.log(amountObj);
                dispatch(getAmountData(amountObj))
          })

        // await fetch(`http://${IP.ip}:3000/payments`)
        // .then((response)=>response.json())
        // .then((response)=>{
        //     dispatch(getAmountData(response[0]))
        //     console.log("// Get Ammount DAta")
        //     console.log(response[0]);
        // })
        // .catch((error)=>console.error(error))
      }



      const getOrderSubTotal=async (orderId)=>{
        await fetch(`http://${IP.ip}:3000/order/sumSubTotal/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>{
            //setSubTotalOfOrder(response[0].subTotal)
            console.log("Order Sub Total")
            console.log(response[0])
            subTotalOfOrder=response[0].subTotal;
        })
        .catch((error)=>console.error(error))
      }


      /////////  Function to update Staff Status
      /*const updateStaffStatuses=(staffId)=>{
        let url=`http://${IP.ip}:3000/staff/updateStatus/${staffId}`;
        let data={
            status:1,
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>dispatch(updateStaffStatus(staffId,1)))
        .catch((error)=>console.error(error))   
      }*/



      const removeAfterDelivery=(staffId)=>{
        let url=`http://${IP.ip}:3000/staff//removeAfterDelivery`;
        let data={
            staffId:staffId,
        }
        fetch(url,{
            method:'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>getUpdatedAssigned())
        .then(()=>getUpdatedAvailable())
        //.then(()=>dispatch(updateStaffStatus(staffId,1)))
        .catch((error)=>console.error(error)) 
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

      // Send Delivered Notification to crossponding Chef
      const sendNotificationToChef=(orderId)=>{

                fetch('https://exp.host/--/api/v2/push/send',{
                        method:'POST',
                        headers:{
                            'Accept':'application/json',
                            'Accept-Encoding':'gzip,deflate',
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify({
                            to:'ExponentPushToken[-4WJz5C4pXrrGDKP9hB1hW]',
                            title:'Order Delivered Made By You',
                            body:`Recently Delivered Order Id: #${orderId}`,  
                            experienceId: "@rehan.ali/chef-module-V1",
                        })
                    }).then(()=>{
                        console.log("Notification Sent to Chef")
                    })
                    .catch((error)=>console.error(error)) 
                }

    
      const renderOrderCard=(itemData)=>{     
        return(
            <OrderCardOrders
            orderId={itemData.item.order_id}
            orderBy={itemData.item.firstname}
            orderTo={itemData.item.kitchen_name}
            totalAmount={itemData.item.total_amount}
            currentStatus={itemData.item.status}
            onSelect={()=>{
                props.navigation.navigate({
                  routeName:'OrderDetails',
                  params:{
                      orderId:itemData.item.order_id,
                      customerId:itemData.item.cust_id,
                      chefId:itemData.item.chef_id,
                      currentStatus:itemData.item.status,
                      time:itemData.item.time,
                      customerName:itemData.item.firstname,
                      kitchenName:itemData.item.kitchen_name

                  }
                  });
              
            }}

            onDelivered={()=>{
                console.log("update button working");
                getDeliveredOrderDetails(itemData.item.order_id);
                setShowModal(true);
            }}
            
            />
        )
      }

      const showAlert=(orderId,amount,name)=>{
        Alert.alert("Order Delivered!",`Order# : ${orderId}\nRecieved Amount : ${amount}\nOrder Status: Delivered\nStaff Name : ${name}\n Availability Status: Available `,[{
            text:'Okey!',
            style:'cancel'
        }]);
    }

        return(
          <View style={styles.screen}>
            <OrdersCard pending={totalOrdersCounts.pendingCounts} box1="Pending" confirmed={totalOrdersCounts.confirmedCounts} box2="Confirmed" delivered={totalOrdersCounts.deliveredCounts} box3="Delivered" header="Orders Summary"/>
              <FlatList data={ordersList} renderItem={renderOrderCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}
            />


            <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:30,marginTop:120,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Update Order Status</Text>
                    </View>
                    <Text style={styles.title}>Order Id: #{deliveredOrderDetails.order_id}</Text>
                    <Text style={styles.subTitle}>Customer Name: {deliveredOrderDetails.customer}</Text>
                    <Text style={styles.subTitle}>Kitchen Name: {deliveredOrderDetails.kitchen}</Text>
                    <Text style={styles.subTitle}>Staff Name: {deliveredOrderDetails.staff}</Text>
                    <Text style={styles.subTitle}>Total Amount: {deliveredOrderDetails.total_amount}</Text>
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
                    //assignTask(orderId,staffId);
                    console.log(`Staff Id`);
                    setShowModal(false);
                    console.log("//////////// DELIVERED ORDER DETAILS ///////////");
                    console.log(deliveredOrderDetails);
                   console.log("// Entering for updating Payments //")
                    setUpdatedPayments(deliveredOrderDetails.kitchen,deliveredOrderDetails.order_id);
                    console.log("// Updated Payments Function Executed //");
                    console.log("// Entering for updating Order Status //")
                    updateOrderStatuses(deliveredOrderDetails.order_id);
                    console.log("// Updated Order Status Function Executed //");
                    //updateStaffStatuses(deliveredOrderDetails.staff);
                    removeAfterDelivery(deliveredOrderDetails.staff_id);
                    showAlert(deliveredOrderDetails.order_id,deliveredOrderDetails.total_amount,deliveredOrderDetails.staff);
                    setRefreshScreen(true);
                    
                    }}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Mark Delivered</Text>
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

export default OrdersScreen;
