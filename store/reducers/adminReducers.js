import { GET_ORDER_DETAILS,GET_ORDER_DATA,UPDATE_ORDER_STATUS,
    GET_ORDER_COUNTS,UPDATE_ORDER_COUNTS,
    GET_STAFF_DATA,UPDATE_STAFF_STATUS,
    GET_AMOUNT_DATA
 } from "../actions/adminActions";

import IP from "../../constants/IP";




const initialState={
    Orders:[],
    Staff:[],
    OrderDetails:[],
    OrdersCounts:{
        totalOrders:0,
        pendingCounts:0,
        confirmedCounts:0,
        deliveredCounts:0
    },
    AmountData:{
        totalCollection:0,
        totalDeliveryCharges:0
    }
}

const adminReducer=(state=initialState,action)=>{
    switch(action.type){
        case GET_ORDER_DATA:
          return {...state,Orders:action.orders};

        case GET_STAFF_DATA:
            return {...state,Staff:action.staff};
        
        case GET_ORDER_DETAILS:
            return {...state,OrderDetails:action.orderDetails};
        
        case GET_ORDER_COUNTS:
            return {...state,OrdersCounts:action.orderCounts};
        
        case GET_AMOUNT_DATA:
            return {...state,AmountData:action.amount};
        
        case UPDATE_ORDER_STATUS:
            const ifSelected=state.Orders.findIndex(order=>order.order_id===action.orderId);
                if(ifSelected>=0){
                        let selectedOrder=state.Orders[ifSelected];
                        selectedOrder.status=action.orderStatus;
                        const ordersData=[...state.Orders];
                        ordersData.splice(ifSelected, 1,selectedOrder);
                        return {...state,Orders:ordersData};
                    };
                return state;
        case UPDATE_STAFF_STATUS:
            const ifSelect=state.Staff.findIndex(staff=>staff.staff_id===action.staffId);
            if(ifSelect>=0){
                let selectedStaff=state.Staff[ifSelect];
                selectedStaff.status=action.staffStatus;
                const staffData=[...state.Staff];
                staffData.splice(ifSelect, 1,selectedStaff);
                return {...state,Staff:staffData};
                };
            return state;
        
        case UPDATE_ORDER_COUNTS:
                    let counts=state.OrdersCounts;
                    if(action.orderStatus==='pending'){
                        counts.pendingCounts=counts.pendingCounts+1;
                    }
                    else if(action.orderStatus==='confirmed'){
                        counts.confirmedCounts=counts.confirmedCounts+1;
                        counts.pendingCounts=counts.pendingCounts-1;
                    }
                    else if(action.orderStatus==='ready to deliver'){
                        counts.confirmedCounts=counts.confirmedCounts-1;
                    }
                    else if(action.orderStatus==='delivered'){
                        counts.deliveredCounts=counts.deliveredCounts+1;
                        //counts.confirmedCounts=counts.confirmedCounts-1;
                    }
                    return {...state,OrdersCounts:counts};
        default:
            return state;    
    }
 
  
}

export default adminReducer;