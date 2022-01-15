import React from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground} from 'react-native';
import Colors from "../constants/Colors";
import AvailableStaffTable from "./availableStaffTable";

const  StaffCardHome=props=>{
   
    return(
        <View style={styles.staffCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.headerText}>Available Staff</Text>
            </View>
            <AvailableStaffTable/>
        </View>
    )
};

const styles=StyleSheet.create({


    staffCard:{
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
        padding:5,
        width:70,
        marginHorizontal:5,
        borderRadius:10
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'flex-end',
        paddingTop:5
    },
    btnTitle:{
        color:Colors.whiteColor,
        fontSize:16,
    }


});

export default StaffCardHome;