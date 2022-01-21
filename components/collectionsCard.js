import React from "react";
import { Text,View,StyleSheet} from 'react-native';
import Colors from "../constants/Colors";
import OrderBox from "./orderBox";


const  CollectionsCard=props=>{
   
    return(
        <View style={styles.collectionCard}>
            <View style={styles.collectionHeader}>
                <Text style={styles.headerText}>{props.header}</Text>
            </View>
            <View style={styles.boxesContainer}>
                <OrderBox number={props.totalCollection} title={props.box1}/>
                <OrderBox number={props.totalCharges} title={props.box2}/>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({


    collectionCard:{
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         padding:15,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    }, 
    collectionHeader:{
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

export default CollectionsCard;