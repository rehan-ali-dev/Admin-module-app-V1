import React from "react";
import { Text,View,StyleSheet} from 'react-native';
import Colors from "../constants/Colors";
import OrderBox from "./orderBox";


const  OrdersCard=props=>{
   
    return(
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.headerText}>{props.header}</Text>
            </View>
            <View style={styles.boxesContainer}>
                <OrderBox number={props.pending} title={props.box1}/>
                <OrderBox number={props.confirmed} title={props.box2}/>
                <OrderBox number={props.delivered} title={props.box3}/>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({


    orderCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
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
        fontWeight:'bold'
    }, 
    boxesContainer:{ 
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },


});

export default OrdersCard;