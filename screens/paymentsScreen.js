import React, { useEffect,useState } from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity,
    RefreshControl,Modal,TextInput,KeyboardAvoidingView,ToastAndroid } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from '../constants/Colors';
import CollectionsCard from "../components/collectionsCard";
import KitchensPaymentsTable from "../components/kitchensPaymentsTable";
import { useSelector,useDispatch } from "react-redux";
import IP from "../constants/IP";
import { getKitchensPayments,updateKitchenPayment } from "../store/actions/adminActions";
import { ScrollView } from "react-native-gesture-handler";
import PaymentRecordTable from "../components/paymentRecordTable";

const PaymentsScreen=(props)=>{

    //const [totalCollectionData,setTotalCollectionData]=useState(0);
    //const [totalDeliveryCharges,setTotalDeliveryCharges]=useState(0);
    const [paymentsRecord,setPaymentsRecord]=useState(0);
    const [refreshing,setRefreshing]=useState(true);
    const [kitchensPayments,setKitchensPayments]=useState([]);
    const [paymentsLoading,setPaymentsLoading]=useState(true);
    const [showModal,setShowModal]=useState(false);
   
    const [kitchenName,setKitchenName]=useState('');
    const [pendingPayment,setPendingPayment]=useState(0);
    const [account_number,setAccount_number]=useState('');
    const [kitchenRecord,setKitchenRecord]=useState([]);
    //const [kitchensNames,setKitchensNames]=useState([]);
    let kitchensNames;
    const [toBePayAmount,setToBePayAmount]=useState('');

    const dispatch=useDispatch();

    const paymentRecord=useSelector(state=>state.admin.AmountData);
    const kitchensPaymentsData=useSelector(state=>state.admin.KitchensPayments);

    
    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/payments/kitchensPayments/${kitchenName}`)
        .then((response)=>response.json())
        .then((response)=>setKitchenRecord(response[0]))
        .catch((error)=>console.error(error))
       
      },[kitchenName]);


      useEffect(()=>{ 
        fetch(`http://${IP.ip}:3000/payments/kitchensPayments`)
        .then((response)=>response.json())
        .then((response)=>setKitchensPayments(response))
        .then(()=>dispatch(getKitchensPayments(kitchensPayments)))
        .catch((error)=>console.error(error))
        .finally(()=>setPaymentsLoading(false))
        },[paymentsLoading]);


        const prepareKitchensPaymentsForTable=(kitchens)=>{
            const tempArray=[];
            const nameArray=[];
            kitchens.map((row)=>{
                let kitchen=row.kitchen_name;
                let account=row.account_number;
                let total=row.total_earning;
                let date1=row.date;
                let date2=date1.toString();
                let date=date2.substring(0, 10)
                let pending=row.pending;
                 let newRow=[kitchen,account,total,pending,date];
                tempArray.push(newRow); 
                nameArray.push(kitchen);

             }) 
            console.log(tempArray);   
            //setKitchensNames(nameArray);    
            kitchensNames=nameArray;
            return tempArray;
        }
      
    const updatePaymentHandler=async (kitchen,pending,toBePay)=>{
        let updatedPending=pending-toBePay;
        var today = new Date();
        var todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log(updatedPending);
        let url=`http://${IP.ip}:3000/payments/updatePayment/${kitchen}`;
        let data={
            updatedPending:updatedPending,
        }
        await fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(()=>dispatch(updateKitchenPayment(kitchen,updatedPending,todayDate)))
        .catch((error)=>console.error(error))
        .finally(()=>ToastAndroid.show(`Payment Updated SuccessFully`, ToastAndroid.SHORT))
    }

    
        return(
          <View style={styles.screen}>
             <ScrollView>
             {/*refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}*/}
             <CollectionsCard box1="Total Collection" box2="Delivery Charges" header="Today's Collection" totalCollection={paymentRecord.totalCollection} totalCharges={paymentRecord.totalDeliveryCharges}/>
             
            <View style={{alignItems:'center',paddingTop:15}}>
             <Text style={styles.headerText}>Kitchens Payments</Text>
             </View>
            
             <KitchensPaymentsTable tableContent={prepareKitchensPaymentsForTable(kitchensPaymentsData)}/> 
             {/* <PaymentRecordTable/> */}

             </ScrollView>
             <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{  
                    setShowModal(true); 
                            // props.navigation.navigate({
                            //     routeName:'AddDish',
                    //});
                }
                 }>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>Update Payments</Text>
                </View>
                </TouchableOpacity>
                </View>


                 {/* Modal For Updating Payments */}

                
              <Modal
                transparent={true}
                visible={showModal}>
               
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <ScrollView>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:100,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>Update Payment</Text>
                    </View>
                    <Text style={styles.subTitle}>Kitchen</Text>
                    <View style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,marginVertical:5}}>
                    <Picker
                            selectedValue={kitchenName}
                            style={{width:'100%'}}
                            onValueChange={(itemValue, itemIndex) => setKitchenName(itemValue)}
                        >
                          <Picker.Item label={'select Kitchen'} value={'disabled'} color='#ccc' />
                          {kitchensNames.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index}/>) 
                            })}
                    </Picker>
                    </View>

                    <Text style={styles.subTitle}>Account Number</Text>
                    <View style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,marginVertical:5}}>
                   
                    <Text style={{...styles.subTitle,color:Colors.lightBlack}}>{kitchenRecord.account_number}</Text>
                
                    </View>

                    <Text style={styles.subTitle}>Pending Amount</Text>
                    <View style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,marginVertical:5}}>
                    <Text style={{...styles.subTitle,color:Colors.lightBlack}}>{kitchenRecord.pending}</Text>
                    </View>

                   
                    <Text style={{...styles.subTitle,marginVertical:5}}>Amount Going to Pay</Text>
                    {/* <View style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,marginVertical:10}}> */}
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="Enter Amount" 
                    keyboardType="numeric"
                    value={toBePayAmount} onChangeText={(text)=>setToBePayAmount(text)}
                    />
                    {/* </View> */}


                <View style={{...styles.btnContainer2,justifyContent:'space-between',marginTop:10}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }}>       
                <View style={{...styles.buttonContainer2,backgroundColor:Colors.primaryLightColor}}>
                    <Text style={styles.btnTitle}>Cancel</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                   
                    updatePaymentHandler(kitchenRecord.kitchen_name,kitchenRecord.pending,toBePayAmount).then(()=>{
                        //props.navigation.goBack();
                        setShowModal(false);
                    })
                    
                    
                    }}>
                <View style={{...styles.buttonContainer2}}>
                    <Text style={styles.btnTitle}>Update</Text>
                </View>
                </TouchableOpacity>
                </View>

                </View>
                </ScrollView>
                </View>
                
            </Modal>


                </View>
        )
    };


const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            
        },
        headerText:{
            color:Colors.primaryColor,
            fontSize:16,
            marginBottom:5,
            fontWeight:'bold'
        }, 
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:160,
            justifyContent:'center',
            alignItems:'center',
            padding:5,
            borderRadius:20,
            
        },
        btnContainer:{
            paddingTop:10,
            position:'absolute',
            bottom:10,
            left:'30%'
           
            
            
        },
        btnTitle:{
            color:Colors.whiteColor,
            fontSize:16,
            paddingEnd:10
        },
        container: {
 
            //alignItems:'center',
            //borderWidth:0.5,
            paddingHorizontal:10,
            justifyContent:'center',
            backgroundColor: '#F5FCFF',
            height:35,
            borderRadius:10
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
        orderDetailsContainer:{
 
             padding:20,
             paddingTop:10,
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
     subTitle:{
        fontSize:16,
        color:"#000"
    },
    orderSubcontainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    buttonContainer2:{
        backgroundColor:Colors.primaryColor,
        justifyContent:'center',
        alignItems:'center',
        padding:3,
        width:100,
        marginHorizontal:5,
        marginBottom:5,
        borderRadius:10
    },
    btnContainer2:{
        flexDirection:'row',
        justifyContent:'flex-end',
        
    },
    
       
    }
)

export default PaymentsScreen;
