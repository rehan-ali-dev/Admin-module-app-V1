import React,{useState} from "react";
import { View,Text,StyleSheet, Button, FlatList,TextInput,TouchableOpacity, ScrollView,Modal } from "react-native";
import Colors from '../constants/Colors';
import ItemDetailsTable from "../components/itemsDetailsTable";


const OrderDetailsScreen=(props)=>{

    const [showModal,setShowModal]=useState(false);
    const [staffName,setStaffName]=useState('');

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
                    <View style={{backgroundColor:'#fff',margin:40,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Assign Delivery Boy</Text>
                    </View>
                    <Text style={styles.title}>Order Id: {props.orderId}</Text>
                    <Text style={styles.subTitle}>Customer Name:  {props.customerName}</Text>
                    <Text style={styles.subTitle}>Kitchen Name:  {props.kitchenName}</Text>
                    <Text style={styles.subTitle}></Text>
                    <Text style={styles.subTitle}>Staff Name</Text>
                    <TextInput style={{...styles.inputText,borderColor:Colors.lightBlack,
                    borderWidth:1}} placeholder="Staff Name" 
                    value={staffName} onChangeText={(text)=>setStaffName(text)}
                    />


                <View style={{...styles.btnContainer,justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer,backgroundColor:Colors.primaryLightColor}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    console.log(`ORder Id: ${staffName}`);
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
