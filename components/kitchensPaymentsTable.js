import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { ScrollView } from "react-native-gesture-handler";

const CONTENT = {
  tableHead: ['Kitchen Name', 'Account No.', 'Total', 'Status'],
  tableData: [
    ['Bisma Ka Kitchen','03039898789', '10000', 'pending'],
    ['0','a', 'b', 'c'],
    ['0','1', '2', '3'],
    ['0','a', 'b', 'c'],
    ['0','a', 'b', 'c'],
    ['0','a', 'b', 'c'],
  ],
};


const KitchensPaymentsTable=()=>{

    
        return(
            <View style={styles.container}>
              <ScrollView>  
            <Table borderStyle={{ borderWidth: 0.7 }}>
              <Row
                data={CONTENT.tableHead}
                flexArr={[2, 1.5, 0.8,1]}
                style={styles.head}
                textStyle={styles.text}
              /> 
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={CONTENT.tableData}
                  flexArr={[2,1.5,0.8,1]}
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
        container: { flex: 1, backgroundColor: '#fff',height:200,marginHorizontal:5 },
        head: { height: 35, backgroundColor: 'orange'},
        wrapper: { flexDirection: 'row' },
        row: { height: 26 },
        text: { textAlign: 'center' },
       
    }
)

export default KitchensPaymentsTable;
