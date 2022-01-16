import React from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import Colors from "../constants/Colors";

const  OrderCardOrders=props=>{
   
    return(
        <View style={styles.notificationCard}>
                <View style={styles.notificationContainer}>
                <Text style={styles.title}>Order Id: {props.orderId}</Text>
                <Text style={styles.timeZone}>Time{props.orderedTime}</Text>
                </View> 
                <Text style={styles.subTitle}>Order by:  {props.customerName}</Text>
                <Text style={styles.subTitle}>Order to:  {props.kitchenName}</Text>
                <Text style={styles.subTitle}>Total Amount:  {props.totalAmount}</Text>
                <View style={styles.notificationContainer}>

               
                <Text style={styles.subTitle}>Current Status:  {props.currentStatus}</Text>

            {props.notDelivered &&
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={props.onSelect}>
                <View style={{...styles.buttonContainer}}>
                    <Text style={styles.btnTitle}>View Details</Text>
                </View>
            </TouchableOpacity>
            </View>
            } 
             </View>
        </View>
    )
};

const styles=StyleSheet.create({


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
    notificationContainer:{
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

export default OrderCardOrders;