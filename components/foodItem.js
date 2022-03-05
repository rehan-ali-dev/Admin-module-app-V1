import React from "react";
import { Text,View,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';
import Colors from "../constants/Colors";


const FoodItem=props=>{

    return(
        <View style={styles.foodItem}>
        <TouchableOpacity onPress={props.onSelect}>
        <View>
            <View style={{...styles.foodRow,...styles.foodHeader}}>
                <ImageBackground source={{uri:props.imageUrl}} style={styles.backgroundImage}>
            <View style={styles.titleContainer}>
            <Text style={styles.Item} numberOfLines={1}>
              {props.title}
            </Text>
            </View>
            </ImageBackground>
        </View>
        <View style={{...styles.foodRow,...styles.foodDetail}}>
            <Text style={styles.kitchenName}>{props.kitchenName}</Text>
            <Text style={styles.price}>Rs.{props.price}</Text>
           
        </View>
        </View>
        </TouchableOpacity>
        </View>
    )
};

const styles=StyleSheet.create({

    foodRow:{
        flexDirection:'row',
        justifyContent:'center'

    },
    foodItem:{
         height:200,
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         overflow:'hidden',
        marginVertical:5,
        marginHorizontal:10
       
    },
    foodHeader:{
        height:'80%'
    },
    foodDetail:{
        height:'20%',
        paddingHorizontal:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    backgroundImage:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end'
    },
    titleContainer:{
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:5,
        paddingHorizontal:10,
    },

    Item:{
        fontSize:22,
        color:'white',
        textAlign:'center'
    },
    kitchenName:{
        fontSize:18,
        color:Colors.lightBlack
    },
    price:{
        fontSize:18,
        color:Colors.primaryColor
    }

});

export default FoodItem;