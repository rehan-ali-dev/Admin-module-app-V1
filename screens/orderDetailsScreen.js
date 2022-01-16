import React,{useState} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity, ScrollView,Modal } from "react-native";
import Colors from '../constants/Colors';
import ItemDetailsTable from "../components/itemsDetailsTable";


const OrderDetailsScreen=(props)=>{

    const [showModal,setShowModal]=useState(false);

        return(
          <View style={styles.screen}>
              <ScrollView>
                <View style={styles.orderDetailsContainer}>
                <View style={styles.orderSubcontainer}>
                <Text style={styles.title}>Order Id: {props.orderId}</Text>
                <Text style={styles.timeZone}>Time{props.orderedTime}</Text>
                </View> 
                <Text style={styles.subTitle}>Customer Name:  {props.customerName}</Text>
                <Text style={styles.subTitle}>Customer Phone:  {props.customerName}</Text>
                <Text style={styles.subTitle}>Kitchen Name:  {props.kitchenName}</Text>
                <Text style={styles.subTitle}>Kitchen Phone:  {props.kitchenName}</Text>
                <Text style={styles.subTitle}>Current Status:  {props.currentStatus}</Text>
                <Text style={styles.subTitle}>Orderd Placed:{props.orderedTime}</Text>
                                

                <Text style={styles.headerText}>Items Details</Text>
                <ItemDetailsTable/>
                <View style={{...styles.orderSubcontainer,paddingTop:15}}>
                <Text style={styles.subTitle}>Sub Total</Text>
                <Text style={styles.subTitle}>Rs.2000</Text>
                </View>

                <View style={styles.orderSubcontainer}>
                <Text style={styles.subTitle}>Delivery Charges</Text>
                <Text style={styles.subTitle}>Rs.100</Text>
                </View>

                <View style={styles.orderSubcontainer}>
                <Text style={styles.title}>Grand Total</Text>
                <Text style={styles.title}>Rs.3000</Text>
                </View>

                
                <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(true);
                    }}>
                <View style={{...styles.buttonContainer}}>
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
                    <View style={{backgroundColor:'#fff',margin:50,borderRadius:10,padding:10}}>
                    <View style={styles.staffHeader}>
                    <Text style={styles.headerText}>Assign Task</Text>
                    </View>
                    <Button title="OKey" onPress={()=>{setShowModal(false)}}></Button>
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
