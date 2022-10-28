import { useEffect, useState } from "react";
import { CartInterface } from "../interfaces/ICart";
import { OrderInterface } from "../interfaces/IOrder";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";


function Order() {
  const [carts, setCarts] = useState<CartInterface[]>([]);
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  //** 5: ดึงข้อมูลทั้งหมด() */
  const getCarts = async () => {
    const apiUrl = "http://localhost:8080/carts";
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
   
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setCarts(res.data);
          }
        });
  };

  //** 8: ดึงข้อมูลทั้งหมด() */
  const getOrders = async () => {
    const apiUrl = "http://localhost:8080/orders";
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    };
   
    fetch(apiUrl, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.data) {
            setOrders(res.data);
          }
        });
  };
  console.log("getOrders:",getOrders)

  useEffect(() => {
    getCarts();
    getOrders();
  }, []);

  const cart_columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 70 },
    {
      field: "Member",
      headerName: "Name",
      width: 200,
      valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName,
    },
  
    { field: "Employee", 
      headerName: "Employee", 
      width: 150 ,
      valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName,
    },

  ];

  const order_columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 70 },
    {
      field: "Product_name",
      headerName: "Name",
      width: 200,
      valueFormatter: (params) => params.value.Product_name,
    },
  
    { field: "Quantity", 
      headerName: "Quantity", 
      width: 150 ,
      valueFormatter: (params) => params.value.Quantity,
    },

    {
      field: "Cart",
      headerName: "Cart",
      width: 200,
      valueFormatter: (params) => params.value.Cart_ID,
    },

  ];

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Order Information
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/cart"
              variant="contained"
              color="primary"
            >
              Add Order
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={carts}
            getRowId={(row) => row.ID}
            columns={cart_columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={orders}
            getRowId={(row) => row.ID}
            columns={order_columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
        
      </Container>
    </div>
  );
}
export default Order;