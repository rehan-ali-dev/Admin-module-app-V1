import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import IP from "../constants/IP";

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { ScrollView } from "react-native-gesture-handler";

const CONTENT = {
  tableHead: ['Item#', 'Dish Name', 'Quantity', 'Amount'],
  tableData: [
    ['100','Chicken Karahi', '100', '5000'],
    ['0','a', 'b', 'c'],
    ['0','1', '2', '3'],
    ['0','a', 'b', 'c'],
    ['0','a', 'b', 'c'],
    ['0','a', 'b', 'c'],
  ],
};


const ItemDetailsTable=(props)=>{

    const [items,setItems]=useState([]);
    const [orderedItems,setOrderedItems]=useState([]);
    const [refreshing,setRefreshing]=useState(true);
    let orderedItemsDetails=[];

    useEffect(()=>{
        const orderId=props.orderID;
        fetch(`http://${IP.ip}:3000/orderDetail/orderedDishes/${orderId}`)
        .then((response)=>response.json())
        .then((response)=>setItems(response))
        .then(()=>{
            console.log(`Fetched ITems :${items}`)
            let itemsArray=[];
            items.map((row)=>{
                let dishId=row.dish_id;
                let dishName=row.dish_name;
                let quantity=row.quantity;
                let totalAmount=row.total_amount;
                let newRow=[dishId,dishName,quantity,totalAmount];
                itemsArray.push(newRow); 
                //orderedItemsDetails.push(newRow);  
                //setOrderedItems(itemsArray); 
                // console.log("////////////// ORdered ITems ");
                // console.log(orderedItems);
            })
            setOrderedItems(itemsArray);
            //orderedItemsDetails=itemsArray;
        })
        .then(()=>setRefreshing(false))
        .catch((error)=>console.error(error))
        
        
      },[refreshing]);
    
        return(
            <View style={styles.container}>
              <ScrollView>  
            <Table borderStyle={{ borderWidth: 0.7 }}>
              <Row
                data={CONTENT.tableHead}
                flexArr={[1, 2, 1,1]}
                style={styles.head}
                textStyle={styles.text}
              /> 
              <TableWrapper style={styles.wrapper}>
                <Rows
                   data={orderedItems}
                  //data={orderedItemsDetails}
                  flexArr={[1,2,1,1]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
              
            </Table>
            </ScrollView>
            
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        container: { flex: 1, backgroundColor: '#fff' },
        head: { height: 35, backgroundColor: 'orange'},
        wrapper: { flexDirection: 'row' },
        row: { height: 26 },
        text: { textAlign: 'center' },
       
    }
)

export default ItemDetailsTable;
