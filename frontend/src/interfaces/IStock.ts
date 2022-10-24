import { LotsInterface } from "./ILot";
import { ShelfproductInterface } from "./IShelfproduct";
import { ProductInterface } from "./IProduct";
import { EmployeeInterface } from "./IEmployee";

export interface StockInterface {
    ID?: number;

    ShelfproductID?: number;
    Shelfproduct?: ShelfproductInterface;

    LotID?: number;
    Lot?: LotsInterface;
    
    ProductID?: number;
    Product?: ProductInterface;

    EmployeeID?: number;
    Employee?: EmployeeInterface;

    Stock_quantity?: number;

  }