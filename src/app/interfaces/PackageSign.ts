
export interface PackageSign {
    id?: string;
    trackingNo: string;
    code: string;
    next?: boolean;
}
/**
 * 如果所有参数为空，则返回当前店铺的所有合作快递员
 */
export interface DeliveryManQuery {
    mob?: string;
    // ALL
    status?:string;
}