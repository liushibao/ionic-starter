export const API_LIST: { [key: string]: { name: string, path: string, doc: string, isScilent?: boolean } } = {
    SESSION_CHALLENGE: {
        name: "SESSION_CHALLENGE",
        path: "/api/auth/serssionChallenge",
        doc: "serssionChallenge.json"
    },
    LOGIN: {
        name: "LOGIN",
        path: "/api/auth/login",
        doc: "login.json"
    },
    USER_SAVE: {
        name: "USER_SAVE",
        path: "/api/user/save",
        doc: "save.json"
    },
    TODO_LIST: {
        name: "TODO_LIST",
        path: "/api/todo/list",
        doc: "list.json"
    },
    UPDATE_TODO_MSG_READ: {
        name: "UPDATE_TODO_MSG_READ",
        path: "/api/todo/msgRead",
        doc: "msgRead.json",
        isScilent: true
    },
    COURIER_LIST: {
        name: "COURIER_LIST",
        path: "/api/courier/list",
        doc: "list.json"
    },
    STORE_LIST: {
        name: "STORE_LIST",
        path: "/api/store/list",
        doc: "list.json"
    }, 
    STORE_UPDATE_DELIVERY_MAN_STATUS: {
        name: "STORE_UPDATE_DELIVERY_MAN_STATUS",
        path: "/api/store/updateDeliveryManStatus",
        doc: "updateDeliveryManStatus.json"
    },
    STORE_ADD_DELIVERY_MAN: {
        name: "STORE_ADD_DELIVERY_MAN",
        path: "/api/store/addDeliveryMan",
        doc: "addDeliveryMan.json"
    },
    DELIVERY_MAN_LIST: {
        name: "DELIVERY_MAN_LIST",
        path: "/api/delivery-man/list",
        doc: "list.json"
    }, 
    DELIVERY_MAN_UPDATE_STORE_STATUS: {
        name: "DELIVERY_MAN_UPDATE_STORE_STATUS",
        path: "/api/delivery-man/updateStoreStatus",
        doc: "updateStoreStatus.json"
    },
    DELIVERY_MAN_ADD_STORE: {
        name: "DELIVERY_MAN_ADD_STORE",
        path: "/api/delivery-man/addStore",
        doc: "addStore.json"
    },
    PACKAGE_GET_CODE: {
        name: "PACKAGE_GET_CODE",
        path: "/api/package/getCode",
        doc: "getCode.json"
    },
    PACKAGE_SEND_CODE: {
        name: "PACKAGE_SEND_CODE",
        path: "/api/package/sendCode",
        doc: "sendCode.json"
    },
    PACKAGE_LIST: {
        name: "PACKAGE_LIST",
        path: "/api/package/list",
        doc: "list.json"
    },
    PACKAGE_GET_BY_TRACKING_NO: {
        name: "PACKAGE_GET_BY_TRACKING_NO",
        path: "/api/package/getPackageByTrackingNo",
        doc: "getPackageByTrackingNo.json"
    },
    PACKAGE_CREATE: {
        name: "PACKAGE_CREATE",
        path: "/api/package/create",
        doc: "create.json"
    },
    PACKAGE_CHECK_IN: {
        name: "PACKAGE_CHECK_IN",
        path: "/api/package/checkIn",
        doc: "checkIn.json"
    },
    PACKAGE_DELETE: {
        name: "PACKAGE_DELETE",
        path: "/api/package/delete",
        doc: "delete.json"
    },
    PACKAGE_RECALL: {
        name: "PACKAGE_RECALL",
        path: "/api/package/recall",
        doc: "recall.json"
    },
    PACKAGE_REJECT: {
        name: "PACKAGE_REJECT",
        path: "/api/package/reject",
        doc: "reject.json"
    },
    PACKAGE_SIGN: {
        name: "PACKAGE_SIGN",
        path: "/api/package/sign",
        doc: "sign.json"
    }
}