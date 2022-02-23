import React,{useState,useEffect} from "react";
import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { useSelector } from "react-redux";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { ScrollView } from "react-native-gesture-handler";

const CONTENT = {
  tableHead: ['Staff Id','Name', 'Phone','salary','address'],
};


const StaffRecordTable=(props)=>{

          
    
        return(
            <View style={styles.container}>
              <ScrollView horizontal={true}>  
            <View>
            <Table borderStyle={{ borderWidth: 0.7 }}>
              <Row
                data={CONTENT.tableHead}
                widthArr={[50, 120,120,80,120]}
                style={styles.head}
                textStyle={styles.text}
              /> 
              <TableWrapper style={styles.wrapper}>
                <Rows
                data={props.tableContent}
                  widthArr={[50,120,120,80,120]}
                  style={styles.row}
                  onPress={()=>{console.log('')}}
                  textStyle={styles.text}
                />
              </TableWrapper>
              
            </Table>
            </View>
            </ScrollView>
            
          </View>
        )
    };


const styles=StyleSheet.create(
    {
        container: { flex: 1, backgroundColor: '#fff',height:200 },
        head: { height: 35, backgroundColor: 'orange'},
        wrapper: { flexDirection: 'row' },
        row: { height: 26 },
        text: { textAlign: 'center' },
       
    }
)

export default StaffRecordTable;
