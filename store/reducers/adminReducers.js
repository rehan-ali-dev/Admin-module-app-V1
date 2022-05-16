import { GET_ORDER_DETAILS,GET_ORDER_DATA,UPDATE_ORDER_STATUS,
    GET_ORDER_COUNTS,UPDATE_ORDER_COUNTS,GET_RATING_DATA,
    GET_STAFF_DATA,UPDATE_STAFF_STATUS,GET_STAFF_AVAILABILITY,
    GET_AMOUNT_DATA,GET_ADMIN_DATA,GET_DISHES_DATA,
    GET_STAFF_ASSIGNED,GET_STAFF_AVAILABLE,
    GET_KITCHENS_PAYMENTS,UPDATE_KITCHEN_PAYMENT,UPDATE_KITCHEN_PAYMENT2
 } from "../actions/adminActions";

import IP from "../../constants/IP";




const initialState={
    Orders:[],
    Staff:[],
    Dishes:[],
    StaffAssigned:[],
    StaffAvailable:[],
    OrderDetails:[],
    AdminDetails:[],
    KitchensPayments:[],
    ratingsOfKitchens:[],
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
        
        case GET_DISHES_DATA:
            return {...state,Dishes:action.dishes};

        case GET_STAFF_DATA:
            return {...state,Staff:action.staff};
        case GET_KITCHENS_PAYMENTS:
            return {...state,KitchensPayments:action.payments};
        
        case GET_ADMIN_DATA:{
            return{...state,AdminDetails:action.admin};
        }
        
        case GET_STAFF_ASSIGNED:
            return {...state,StaffAssigned:action.staff};
        
        case GET_STAFF_AVAILABLE:
            return{...state,StaffAvailable:action.staff};
        
        case GET_ORDER_DETAILS:
            return {...state,OrderDetails:action.orderDetails};
        
        case GET_ORDER_COUNTS:
            return {...state,OrdersCounts:action.orderCounts};
        
        case GET_RATING_DATA:
            return {...state,ratingsOfKitchens:action.ratings};
        
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
        
        case UPDATE_KITCHEN_PAYMENT:
                const isKitchenSelected=state.KitchensPayments.findIndex(kitchen=>kitchen.kitchen_name===action.kitchen);
                if(isKitchenSelected>=0){
                    let selectedKitchen=state.KitchensPayments[isKitchenSelected];
                    //selectedKitchen.total_earning=action.total;
                    selectedKitchen.pending=action.pending;
                    selectedKitchen.date=action.date;
                    const kitchensPaymentsData=[...state.KitchensPayments];
                    kitchensPaymentsData.splice(isKitchenSelected, 1,selectedKitchen);
                    return {...state,KitchensPayments:kitchensPaymentsData};
                    };
                return state;
        
        case UPDATE_KITCHEN_PAYMENT2:
                const isKitchenSelected2=state.KitchensPayments.findIndex(kitchen=>kitchen.kitchen_name===action.kitchen);
                if(isKitchenSelected2>=0){
                        let selectedKitchen=state.KitchensPayments[isKitchenSelected2];
                        //selectedKitchen.total_earning=action.total;
                        selectedKitchen.pending=action.pending;
                        selectedKitchen.total_earning=action.total;
                        const kitchensPaymentsData=[...state.KitchensPayments];
                        kitchensPaymentsData.splice(isKitchenSelected2, 1,selectedKitchen);
                        return {...state,KitchensPayments:kitchensPaymentsData};
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