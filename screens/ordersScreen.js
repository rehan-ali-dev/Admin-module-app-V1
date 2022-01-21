import React,{useEffect,useState} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,Modal,TextInput,Alert } from "react-native";
import Colors from '../constants/Colors';
import IP from "../constants/IP";
import OrderCardOrders from "../components/orderCardOrdersScreen";


const OrdersScreen=(props)=>{

    const [ordersData,setOrdersData]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [deliveredOrderDetails,setDeliveredOrderDetails]=useState('');
    const [refreshScreen,setRefreshScreen]=useState(false);
   

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/order/ordersForAdmin`)
        .then((response)=>response.json())
        .then((response)=>setOrdersData(response))
        .then(()=>{setRefreshScreen(false)})
        .catch((error)=>console.error(error))
       
      },[refreshScreen]);

      const getDeliveredOrderDetails=(orderId)=>{
        fetch(`http://${IP.ip}:3000/order/orderRecord/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>setDeliveredOrderDetails(response[0]))
        .catch((error)=>console.error(error))
      }

       /////////  Function to update the status of order 
       const updateOrderStatus=(orderId)=>{
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
        .catch((error)=>console.error(error))   
      }

    
      const renderOrderCard=(itemData)=>{     
        return(
            <OrderCardOrders
            orderId={itemData.item.order_id}
            orderBy={itemData.item.cust_id}
            orderTo={itemData.item.chef_id}
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
                      time:itemData.item.time
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
              <FlatList data={ordersData} renderItem={renderOrderCard} keyExtractor={(item)=>item.order_id}
            showsVerticalScrollIndicator={false}/>


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
                    updateOrderStatus(deliveredOrderDetails.order_id);
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
