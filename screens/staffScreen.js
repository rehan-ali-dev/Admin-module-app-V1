import React from "react";
import { View,Text,StyleSheet, Button, TextInput, Modal,TouchableOpacity,RefreshControl,ToastAndroid } from "react-native";
import Colors from '../constants/Colors';
import { useEffect, useState } from "react";
import AssignedStaffTable from "../components/assignedStaffTable";
import StaffInfoCard from "../components/staffInfoCard";
import { ScrollView } from "react-native-gesture-handler";
import AvailableStaffTable from '../components/availableStaffTable';
import StaffRecordTable from "../components/staffRecordTable";
import { useSelector,useDispatch } from "react-redux";
import { getStaffAvailable } from "../store/actions/adminActions";
import IP from "../constants/IP";
import { add } from "react-native-reanimated";
const StaffScreen=()=>{

    const [refreshing, setRefreshing] = useState(true);
    const [showModal,setShowModal]=useState(false);
    const [availableStaff,setAvailableStaff]=useState([]);
    const [availableStaffData,setAvailableStaffData]=useState([]);

    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [contact,setContact]=useState('');
    const [cninc,setCnic]=useState('');
    const [address,setAddress]=useState('');
    const [salary,setSalary]=useState('');


    const dispatch=useDispatch();
    const availableStaffRecord=useSelector(state=>state.admin.StaffAvailable);
    const StaffRecord=useSelector(state=>state.admin.Staff);
    /*
    useEffect(()=>{
        let staffArray=[];
        fetch(`http://${IP.ip}:3000/staff/staffStatus/assigned`)
        .then((response)=>response.json())
        .then((response)=>setAssignedStaff(response))
        .then(()=>{
            assignedStaff.map((row)=>{
                 let staffId=row.staff_id;
                 let name=row.firstname;
                 let phone=row.contact;
                 let orderId=row.order_id;
                 let newRow=[staffId,name,phone,orderId];
                 staffArray.push(newRow);       
        })
        }).then(()=>setRefreshing(false))
        .then(()=>setAssignedStaffData(staffArray))
        .catch((error)=>console.error(error))
       
      },[refreshing]);*/

      useEffect(()=>{ 
        fetch(`http://${IP.ip}:3000/staff/staffData/available`)
        .then((response)=>response.json())
        .then((response)=>dispatch(getStaffAvailable(response)))
        .catch((error)=>console.error(error))
        .finally(()=>setRefreshing(false))
        },[refreshing]);


        const prepareAvailableStaffForTable=(staff)=>{
            const tempArray=[];
            staff.map((row)=>{
                let staffId=row.staff_id;
                let name=row.firstname;
                 let phone=row.contact;
                 let newRow=[staffId,name,phone];
                tempArray.push(newRow);  
             }) 
            console.log(tempArray);       
            return tempArray;
        }

        const prepareAllStaffForTable=(staff)=>{
            const tempArray=[];
            staff.map((row)=>{
                let staffId=row.staff_id;
                let name=row.firstname;
                 let phone=row.contact;
                 let salary=row.salary;
                 let address=row.address;
                 let newRow=[staffId,name,phone,salary,address];
                tempArray.push(newRow);  
             }) 
            console.log(tempArray);       
            return tempArray;
        }

        const addNewStaffHandler=async (firstName,lastName,Contact,CNIC,Address,Salary)=>{
            let url=`http://${IP.ip}:3000/staff/addNew`;
            let data={
                fname:firstName,
                lname:lastName,
                phone:Contact,
                cnic:CNIC,
                address:Address,
                salary:Salary,
            }
            await fetch(url,{
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify(data)
            }).then((response)=>response.json())
           // .then(()=>dispatch(updateKitchenPayment(kitchen,updatedPending,todayDate)))
            .catch((error)=>console.error(error))
            .finally(()=>ToastAndroid.show(`New Staff Added Successfully`, ToastAndroid.SHORT))
        }
    
    

    
        return(
          <View>

            <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Staff Record</Text>
            </View>
            <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}
            >
              <View style={{paddingHorizontal:10,flex:1}}>
              <StaffRecordTable tableContent={prepareAllStaffForTable(StaffRecord)}/>
              </View>
            </ScrollView>
              
              <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Available Staff</Text>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{setRefreshing(true)}}/>}>
              {/*<AssignedStaffTable tableData={assignedStaffData}/>*/}
              <View style={{paddingHorizontal:10,flex:1}}>
              <AvailableStaffTable tableContent={prepareAvailableStaffForTable(availableStaffRecord)}/>
              </View>
            </ScrollView>
            <View style={{marginTop:130}}>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={()=>{  
                    setShowModal(true); 
                            // props.navigation.navigate({
                            //     routeName:'AddDish',
                    //});
                }
                 }>
                <View style={styles.buttonContainer}>
                    <Text style={styles.btnTitle}>ADD NEW STAFF</Text>
                </View>
                </TouchableOpacity>
                </View>
                </View>


            {/** 
            <View>
            <View style={styles.staffHeader}>
                <Text style={styles.staffHeaderText}>Staff Record</Text>
            </View>
                <StaffInfoCard available/>
            </View>
            */}

            <Modal
                transparent={true}
                visible={showModal}>
                <View style={{backgroundColor:'#000000aa',flex:1}}>
                <ScrollView>
                    <View style={{backgroundColor:'#fff',margin:40,marginTop:100,borderRadius:10,padding:10}}>
                    <View style={styles.orderHeader}>
                    <Text style={styles.headerText}>ADD NEW MEMBER</Text>
                    </View>
                    <Text style={styles.subTitle}>First Name</Text>
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="First Name" 
                    value={firstName} onChangeText={(text)=>setFirstName(text)}
                    />

                    <Text style={styles.subTitle}>Last Name</Text>
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="Last Name" 
                    value={lastName} onChangeText={(text)=>setLastName(text)}
                    />
                    
                    <Text style={styles.subTitle}>Contact</Text>
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="Contact" keyboardType="numeric"
                    value={contact} onChangeText={(text)=>setContact(text)}
                    />
                    
                    <Text style={styles.subTitle}>CNIC</Text>
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="CNIC" 
                    value={cninc} onChangeText={(text)=>setCnic(text)}
                    />

                    <Text style={styles.subTitle}>Address</Text>
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="Address" 
                    value={address} onChangeText={(text)=>setAddress(text)}
                    />

                    <Text style={styles.subTitle}>Salary</Text>
                    <TextInput style={{...styles.container,borderColor:Colors.lightBlack,
                    borderWidth:1,paddingHorizontal:10}} placeholder="Salary" keyboardType="numeric"
                    value={salary} onChangeText={(text)=>setSalary(text)}
                    />
                    



                <View style={{...styles.btnContainer2,justifyContent:'space-between',marginTop:10}}>
                <TouchableOpacity onPress={()=>{
                    setShowModal(false);
                    }} style={{...styles.buttonContainer2,backgroundColor:Colors.primaryLightColor}}>       
                <View>
                    <Text style={styles.btnTitle}>CANCEL</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                   
                    addNewStaffHandler(firstName,lastName,contact,cninc,address,salary).then(()=>{
                        //props.navigation.goBack();
                        setShowModal(false);
                    })
                    
                    
                    }} style={styles.buttonContainer2}>
                <View>
                    <Text style={styles.btnTitle}>ADD</Text>
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
       
        staffHeader:{
            justifyContent:'center',
            alignItems:'center',
            paddingVertical:10,
        }, 
        staffHeaderText:{
            color:Colors.primaryColor,
            fontSize:16,
            fontWeight:'bold'
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
        buttonContainer:{
            flexDirection:'row',
            backgroundColor:Colors.primaryColor,
            width:160,
            justifyContent:'center',
            alignItems:'center',
            padding:5,
            borderRadius:20,
            
        },
       

        container: {
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
        paddingVertical:3,
        width:100,
        marginHorizontal:5,
        marginBottom:5,
        borderRadius:10
    },
    btnContainer2:{
        flexDirection:'row',
        //justifyContent:'flex-end',

        
    },
       
    }
)

export default StaffScreen;
