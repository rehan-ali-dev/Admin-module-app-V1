import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  ImageBackground,
  Picker,
  Button,
  Platform,
} from "react-native"
import { State } from "react-native-gesture-handler"
import { Row } from "react-native-table-component"
import { Table } from "react-native-table-component"
import { Rows } from "react-native-table-component"
import { TableWrapper } from "react-native-table-component"
const PaymentRecordTable = (props) => {
  //tablehead
  const [currentTableHead, setcurrentTableHead] = useState([
    "Kitchen Name",
    "Chef Name",
    "Total Earnings",
    "Pending Amount",
    "Latest Withdawn",
  ])

  //tablerows
  const [currentTableRows, setcurrentTableRows] = useState([
    ["Unhygenic Food", "Ali", "0","hkjl","hljdsl"],
    ["Extra Bura Khana", "Rehan", "-0","hkjl","hljdsl"],
    ["Lahore ka khota", "Manzoor", "1 lac","hkjl","hljdsl"],
  ])
  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 1 }}>
        <Row
          data={currentTableHead}
          style={styles.head}
          flexArr={[2, 1, 1,1,1]}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={currentTableRows}
            style={styles.rows}
            flexArr={[2, 1, 1,1,1]}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#ff620a",
  },

  head: {
    height: 40,
    backgroundColor: "#ffab00",
  },
  wrapper: { flexDirection: "row" },
  rows: {
    height: 30,
    backgroundColor: "white",
  },
  text: {
    margin: 5,
    textAlign: "center",
  },
})
export default PaymentRecordTable
