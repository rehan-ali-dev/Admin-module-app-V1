import React,{useEffect,useState} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,Modal,TextInput } from "react-native";
import Colors from '../constants/Colors';
import IP from "../constants/IP";
import OrderCardOrders from "../components/orderCardOrdersScreen";


const OrdersScreen=(props)=>{

    const [ordersData,setOrdersData]=useState([]);
    const [showModal,setShowModal]=useState(false);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/order/ordersForAdmin`)
        .then((response)=>response.json())
        .then((response)=>setOrdersData(response))
        .catch((error)=>console.error(error))
       
      },[]);

    
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
                setShowModal(true);
            }}
            
            />
        )
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
                    <Text style={styles.headerText}>Assign Delivery Boy</Text>
                    </View>
                    <Text style={styles.title}>Order Id: #</Text>
                    <Text style={styles.subTitle}>Customer Name:</Text>
                    <Text style={styles.subTitle}>Kitchen Name:</Text>
                    <Text style={styles.subTitle}></Text>
                    <Text style={styles.subTitle}>Staff Id</Text>
                    {/* 
                    <TextInput style={{...styles.inputText,borderColor:Colors.lightBlack,
                    borderWidth:1}} placeholder="Staff Id" 
                    value={staffId} onChangeText={(text)=>console.log(text)}
                    />*/}
                 
                <View style={{...styles.btnContainer,justifyContent:'space-between'}}>
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
