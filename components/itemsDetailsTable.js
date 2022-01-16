import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';

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


const ItemDetailsTable=()=>{

    
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
                  data={CONTENT.tableData}
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
        container: { flex: 1, backgroundColor: '#fff',height:180 },
        head: { height: 35, backgroundColor: 'orange'},
        wrapper: { flexDirection: 'row' },
        row: { height: 26 },
        text: { textAlign: 'center' },
       
    }
)

export default ItemDetailsTable;