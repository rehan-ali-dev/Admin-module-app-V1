import React from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import Colors from "../constants/Colors";

const RequestCard=props=>{
   
    return(
        <View style={styles.requestCard}>
                
                <Text style={styles.title}>New registeration request recieved</Text>
                <Text style={styles.subTitle}>Request recieved from {props.firstname} {props.lastname} to register {props.kitchen} as new kitchen</Text>
              
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={props.onSelect}>
                    <View style={{...styles.buttonContainer}}>
                        <Text style={styles.btnTitle}>View Details</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({


    requestCard:{
         width:'98%',
         backgroundColor:'#f5f5f5',
         borderRadius:15,
         elevation:5,
        paddingTop:10,
        paddingHorizontal:10,
        paddingBottom:5,
         overflow:'hidden',
         marginVertical:5,
         marginHorizontal:3
       
    },  
    
    title:{
        fontSize:16,
        fontWeight:"bold",
        color:'#000'
    },
    subTitle:{
        fontSize:16,
        color:"#000"
    },
    requestContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonContainer:{
        backgroundColor:Colors.primaryColor,
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        width:100,
        margin:5,
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

export default RequestCard;