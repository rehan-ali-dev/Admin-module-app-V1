import React from "react";
import { useState } from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground,Modal,TextInput} from 'react-native';
import Colors from "../constants/Colors";

const  StaffInfoCard=props=>{
    const [isShowModal,setShowModal]=useState(false);
    const [orderId,setOrderId]=useState('');
   
    return(
        <View style={styles.staffCard}>
                
                <Text style={styles.title}>Staff Id: {props.staffId}</Text>
                <Text style={styles.subTitle}>Name:  {props.staffName}</Text>
                <Text style={styles.subTitle}>Contact:  {props.contact}</Text>
                
                <View style={styles.staffContainer}>
                <Text style={styles.subTitle}>Availability:  {props.availability}</Text>  
            {props.available &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={()=>{
                    setShowModal(true);
            }}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>Assign Task</Text>
                </View>
            </TouchableOpacity>
            </View>
            } 
            </View>


            <Modal
                transparent={true}
                visible={isShowModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                    <View style={{backgroundColor:'#fff',margin:40,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Assign Task</Text>
                    </View>
                    <Text style={styles.title}>Order Id: {props.orderId}</Text>
                    <Text style={styles.subTitle}>Customer Name:  {props.customerName}</Text>
                    <Text style={styles.subTitle}>Kitchen Name:  {props.kitchenName}</Text>
                    <Text style={styles.subTitle}></Text>
                    <Text style={styles.subTitle}>Order Id</Text>
                    <TextInput style={{...styles.inputText,borderColor:Colors.lightBlack,
                    borderWidth:1}} placeholder="Order Id" 
                    value={orderId} onChangeText={(text)=>setOrderId(text)}
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
                    console.log(`Staff Name: ${orderId}`);
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

const styles=StyleSheet.create({


    staffCard:{
         width:'95%',
         backgroundColor:'#fff',
         borderRadius:15,
         elevation:5,
        paddingTop:10,
        paddingHorizontal:5,
        paddingBottom:5,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },  
    staffHeader:{
        justifyContent:'center',
        alignItems:'center'
    }, 
    headerText:{
        color:Colors.primaryColor,
        fontSize:16,
        marginBottom:5,
        fontWeight:'bold'
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
    staffContainer:{
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


});

export default StaffInfoCard;