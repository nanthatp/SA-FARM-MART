import { EmployeeInterface } from "./IEmployee";
import {CartInterface } from "./ICart";
import { PaymentTypeInterface } from "./IPaymentType";
import { MemberInterface } from "./IMember";


export interface ReceiptInterface {
  ID?:          number;
  ReceiptTime?: Date | null;
  ReceiptSum?:   number;
  ReceiptPaymentAmount?: number;
  ReceiptChange?:        number;
  PaymenttypeID?: number;
  Paymenttype?:   PaymentTypeInterface;
  CartID?: number;
  Cart?:   CartInterface;
  EmployeeID?: number;
  Employee?:   EmployeeInterface;
  MemberID?: number;
  Member?:   MemberInterface;
}