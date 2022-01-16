import React from "react";
import { useState } from "react";
import { Text,View,StyleSheet,TouchableOpacity,Image,ImageBackground,Modal, Button} from 'react-native';
import Colors from "../constants/Colors";

const  StaffInfoCard=props=>{
    const [isShowModal,setShowModal]=useState(false);
   
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
                    <View style={{backgroundColor:'#fff',margin:50,borderRadius:10,padding:10}}>
                    <View style={styles.staffHeader}>
                    <Text style={styles.headerText}>Assign Task</Text>
                    </View>
                    <Button title="OKey" onPress={()=>{setShowModal(false)}}></Button>
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