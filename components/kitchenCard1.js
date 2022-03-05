import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from "../constants/Colors";


const KitchenCard=props=>{
   
    return(
        <View style={styles.kitchenCard}>
        <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.kitchenHeader}>
            <View style={styles.logoContainer}>
            <Image source={{uri:props.kitchenLogo}} style={styles.logoImage} />
        </View>
        <View style={styles.nameRating}>
            <Text style={styles.kitchenName}>{props.kitchenName}</Text>
            <View style={styles.rating}>
            <FontAwesome name="star" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star-half-empty" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star-o" size={18} color={Colors.primaryLightColor} />
            </View>
            <View>
                <Text style={styles.numDishes}>15 DISHES</Text>
            </View>
        </View>
        </View>
        <View style={styles.moreDetails}>
        
        <Text style={styles.specialHeader}>DISH SPECIALITIES</Text>
        <View>
            <Text style={styles.dishes}>Chicken Biryani, Chicken Karahi</Text>
        </View>
        <View style={styles.timeDetail}>
            <View style={styles.time}>
                <Text style={styles.timeHead}>START TIME</Text>
                <Text style={styles.timeData}>{props.startTime}</Text>
            </View>
            <View style={styles.time}>
                <Text style={styles.timeHead}>END TIME</Text>
                <Text style={styles.timeData}>{props.endTime}</Text>
            </View>
        </View>
        </View>
        
        </TouchableOpacity>
        </View>
    )
};

const styles=StyleSheet.create({


    kitchenCard:{
         height:180,
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10
       
    },
    kitchenHeader:{
        height:'55%',
        width:'100%',
        padding:15,
        flexDirection:'row',
      
    },
    logoContainer: {
        width:80,
        height:80,
        borderRadius:40,
        overflow:'hidden',
        marginEnd:10     
    },
    logoImage:{
        width:'100%',
        height:'100%',
    },
    nameRating:{
        flexDirection:'column'
    },
    rating:{
        flexDirection:'row'
    },
    specialHeader:{
        fontSize:16,
        color:Colors.primaryColor
    },
    numDishes:{
        fontSize:16,
        color:Colors.lightBlack
    },
    dishes:{
        color:Colors.lightBlack
    },
    moreDetails:{
        marginHorizontal:20,
        paddingHorizontal:5
    },
    kitchenName:{
        fontSize:22,
        color:Colors.primaryColor,
        paddingTop:10,
    },
    timeDetail:{
        flexDirection:'row',
        justifyContent:'space-between'
       
    },
    timeHead:{
        color:Colors.primaryColor
    },
    timeData:{
        color:Colors.lightBlack
    }

});

export default KitchenCard;