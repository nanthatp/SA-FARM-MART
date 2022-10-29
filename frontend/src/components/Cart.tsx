import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import InputLabel from '@mui/material/InputLabel';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Autocomplete, Button } from "@mui/material";

import { EmployeeInterface } from "../interfaces/IEmployee";
import { MemberInterface } from "../interfaces/IMember";
import { ProductInterface } from "../interfaces/IProduct";
import { OrderInterface } from "../interfaces/IOrder";
import { CartInterface } from "../interfaces/ICart";

import {
  GetEmployeeByEID,
  GetMembers,
} from "../services/HttpClientService";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cart() {
  const [employee, setEmployee] = useState<EmployeeInterface>();
  const [members, setMembers] = useState<MemberInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [Quantity, setQuantity] = useState<number | undefined>();
  const [carts, setCarts] = useState<Partial<CartInterface>>({});
  const [cartID, setcartID] = useState<number | null>(null);
  const [orders, setOrders] = useState<Partial<OrderInterface>>({});
  const [productID, setProductID] = useState<number>();
  const [empoyeeID, setEmpoyeeID] = useState<number>();
  const [telephone, setTelphone] = useState<number>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);



  const handleChange = (event: any) => {
    setTelphone(event.target.value)
  }

  const handleChangeProduct = (value: any) => {
    // console.log("Product ID : ", value.target.value);
    setProductID(value.target.value)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  async function submit() {


    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    let data_cart = {
      Employee_ID: Number(localStorage.getItem("uid")),
      Telephone: carts.Telephone ?? "",
    };
    // console.log(products);

    let product3 = products.filter((e) => e.ID === productID)
    let data_order = {
      ProductID: productID,
      Product_quantity: Number(Quantity),
      EmpoyeeID: employee?.ID,
      Telephone: telephone,
      Product: product3[0]

    };
    // const dataT = JSON.stringify(data_order)
    // console.log("Data order : ", dataT);

    const apiUrl = "http://localhost:8080";

    const requestOptions_cart = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_cart),
    };

    const requestOptions_order = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_order),
    };
    
    console.log("Before upload : " , requestOptions_order.body);
    fetch(`${apiUrl}/orders`, requestOptions_order)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true)
        } else {
          setError(true)
        }
      });
  }

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
          setcartID((res.data.at(-1).ID) + 1); // ตรวจสอบเอาเฉพาะ cartID ล่าสุด
        } else {
          setcartID(1);
        }
      });
  };

  // Get Employee
  const getEmployee = async () => {
    let res = await GetEmployeeByEID();
    carts.EmployeeID = res.ID;
    if (res) {
      setEmployee(res);
    }
  };

  const getMembers = async () => {
    let res = await GetMembers();
    carts.MemberID = res.ID;
    if (res) {
      setMembers(res);
    }
  };

  const getProducts = async () => {
    const apiUrl = "http://localhost:8080/products";
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setProducts(res.data);
        }
      });
  };

  React.useEffect(() => {
    getCarts();
    getMembers();
    getEmployee();
    getProducts();
  }, []);

  const handleChangeQuantity = (value: any) => {
    // console.log("Quantity : ", value.nativeEvent.data);
    setQuantity(value.nativeEvent.data)
  }

  const handleChangeEmpoyee = (value: any) => {
    // console.log("Empoyee : ", value.nativeEvent.data);
    setEmpoyeeID(value.nativeEvent.data);
  }
  // console.log("members : ", carts);
  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Failed!
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Shopping Cart
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl fullWidth >
              <InputLabel id="InputLabeltel">Telephone number</InputLabel>
              <Select
                required
                labelId="labelIdtel"
                id="idtel"
                label="Telephone Number"
                native
                value={carts.EmployeeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "MemberID",
                }}
              >
                <option aria-label="None" value=""></option>
                {members.map((item: MemberInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Telephone}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <Autocomplete
                id="product"
                options={products}
                sx={{ paddingY: 2 }}
                style={{ float: "right" }}
                size="medium"
                onChange={handleChangeProduct}
                getOptionLabel={(option: any) =>
                  `${option.Product_name}`
                }
                renderInput={(params) => <TextField {...params} label="Product " />}
                renderOption={(props: any, option: any) => {
                  return (
                    <li
                      {...props}
                      value={option.ID}
                      key={option.ID}
                    >{option.Product_name}</li>
                  );
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} >
            <FormControl fullWidth variant="outlined" >
              <TextField
                margin="normal"
                required
                id="Product_quantity"
                variant="outlined"
                type="number"
                size="medium"
                value={orders?.Product_quantity}
                onChange={handleChangeQuantity}
                label="Quantity"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <TextField
                margin="normal"
                id="demo-simple-select"
                label="Employee"
                value={`${employee?.FirstName} ${employee?.FirstName}`}
                onChange={handleChangeEmpoyee}
                disabled
                inputProps={{
                  name: "EmployeeID",
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
export default Cart;