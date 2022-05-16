import React,{useEffect,useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import IP from "../constants/IP";

const KitchenCard=props=>{

    const starImgFilled='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png';
    const starImgCorner='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png';

    const [maxRating,setMaxRating]=useState([1,2,3,4,5]);

    const CustomRatingBar=()=>{
        return(
            <View style={styles.rating}>
                {
                    maxRating.map((item,key)=>{
                        return(
                         <Image
                            style={styles.starImgStyle}
                            key={item}
                            source={
                                item<=props.rating
                                ? {uri:starImgFilled}
                                : {uri:starImgCorner}
                            }
                            />
                        )
                    })
                }
            </View>
        )}

   
    return(
        <View style={styles.kitchenCard}>
        <TouchableOpacity onPress={props.onSelect}>
        <View style={styles.kitchenHeader}>
            <View style={styles.logoContainer}>
            <Image source={{uri:`http://${IP.ip}:3000/images/${props.kitchenLogo}`}} style={styles.logoImage} />
        </View>
        <View style={styles.nameRating}>
            <Text style={styles.kitchenName}>{props.kitchenName}</Text>
            {/* <View style={styles.rating}>
            <FontAwesome name="star" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star-half-empty" size={18} color={Colors.primaryLightColor} />
            <FontAwesome name="star-o" size={18} color={Colors.primaryLightColor} />
            </View> */}
            <View>
                <Text style={{...styles.numDishes}}>Owned By : {props.fname} {props.lname}</Text>
            </View>
            <View>
                <Text style={styles.numDishes}>Contact : {props.chefId}</Text>
            </View>
           {props.rating &&
            <View style={{flexDirection:'row'}}>
            <Text style={styles.numDishes}>Rating: </Text>
            <View style={styles.rating}>
                <CustomRatingBar/>
           
            </View>
            </View>
            }
            {props.address &&
            <View style={{flexDirection:'row'}}>
            <Text style={{...styles.numDishes}}>Address: </Text>
            <Text style={{...styles.numDishes,fontSize:14}}>{props.address}</Text>

            </View>
             }
            <View>
                <Text style={styles.numDishes}>{props.noOfDishes} DISHES</Text>
            </View>
        </View>
        </View>
        <View style={styles.moreDetails}>
        
        {/* <Text style={styles.specialHeader}>DISH SPECIALITIES</Text>
        <View>
            <Text style={styles.dishes}>Chicken Biryani, Chicken Karahi</Text>
        </View> */}
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
         //height:160,
         flex:1,
         width:'95%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:10,
         paddingBottom:5,
       
    },
    kitchenHeader:{
        height:120,
        width:'100%',
        padding:15,
        flexDirection:'row',
      
    },
    logoContainer: {
        width:80,
        height:80,
        borderRadius:40,
        marginTop:20,
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
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-between'
       
    },
    timeHead:{
        color:Colors.primaryColor
    },
    timeData:{
        color:Colors.lightBlack
    },
    nameRating:{
        flexDirection:'column'
    },
    rating:{
        flexDirection:'row'
    },
    starImgStyle:{
        width:20,
        height:20,
        resizeMode:'cover'
    },


});

export default KitchenCard;