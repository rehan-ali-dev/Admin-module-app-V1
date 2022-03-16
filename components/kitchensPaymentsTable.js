import React from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { ScrollView } from "react-native-gesture-handler";

const CONTENT = {
  tableHead: ['Kitchen Name', 'Account No.', 'Total Earning', 'Pending','Date'],
  tableData: [
    ['Bisma Ka Kitchen','03039898789', '10000', '1900','12-12-20202'],
    ['0','a', 'b', 'c', '1900','12-12-20202'],
    ['0','1', '2', '3', '1900','12-12-20202'],
    ['0','a', 'b', 'c', '1900','12-12-20202'],
    ['0','a', 'b', 'c', '1900','12-12-20202'],
    ['0','a', 'b', 'c', '1900','12-12-20202'],
  ],
};


const KitchensPaymentsTable=(props)=>{

    
        return(
            <View style={styles.container}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>  
            <Table borderStyle={{ borderWidth: 0.7 }}>
              <Row
                data={CONTENT.tableHead}
               
                widthArr={[180, 110, 100,100,100]}
                style={styles.head}
                textStyle={styles.text}
              /> 
              <TableWrapper style={styles.wrapper}>
                <Rows
                 data={props.tableContent}
                  //data={CONTENT.tableData}
                  widthArr={[180,110,100,100,100]}
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
        container: { flex: 1, backgroundColor: '#fff',marginHorizontal:5 },
        head: { height: 35, backgroundColor: 'orange'},
        wrapper: { flexDirection: 'row' },
        row: { height: 26 },
        text: { textAlign: 'center' },
       
    }
)

export default KitchensPaymentsTable;
