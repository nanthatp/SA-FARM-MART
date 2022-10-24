import { LotsInterface } from "./ILot";
import { ShelfproductInterface } from "./IShelfproduct";
import { ProductInterface } from "./IProduct";
import { EmployeeInterface } from "./IEmployee";

export interface StockInterface {
    ID?: number;
    ProductID?: number;
    Product_name?: ProductInterface;
    Stock_quanitiy?: number;
    ShelfproductID?: number;
    Shelfproduct_name?: ShelfproductInterface;
    LotID?: number;
    Lot_number?: LotsInterface;
    FirstName?: EmployeeInterface;
    EmployeeID?: number;
  }