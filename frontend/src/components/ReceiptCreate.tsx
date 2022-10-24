import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { CartInterface } from "../interfaces/ICart";
import { MemberInterface } from "../interfaces/IMember";
import { PaymentTypeInterface } from "../interfaces/IPaymentType";
import { ReceiptInterface } from "../interfaces/IReceipt";
import { EmployeeInterface } from "../interfaces/IEmployee";

import {
  GetEmployeeByEID,
  GetCarts,
  GetMembers,
  Receipts,
} from "../services/HttpClientService";
import { InputLabel } from "@mui/material";

const apiUrl = "http://localhost:8080";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

async function GetPaymenttypes() {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/paymenttypes`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

function ReceiptCreate() {
  const [paymenttypes, setPaymentTypes] = useState<PaymentTypeInterface[]>([]);
  const [carts, setCarts] = useState<CartInterface[]>([]);
  const [employees, setEmployees] = useState<EmployeeInterface>();
  const [members, setMembers] = useState<MemberInterface[]>([]);
  const [receipts, setReceipts] = useState<ReceiptInterface>({
    ReceiptTime: new Date(),
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof ReceiptCreate;
    const { value } = event.target;
    setReceipts({ ...receipts, [id]: value });
  };

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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof receipts;
    setReceipts({
      ...receipts,
      [name]: event.target.value,
    });
    console.log(name);

  };

  const handleCart = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof receipts;
    setReceipts({
      ...receipts,
      [name]: event.target.value,
    });

  };

  const getEmployees = async () => {
    let res = await GetEmployeeByEID();
    receipts.EmployeeID = res.ID;
    if (res) {
      setEmployees(res);
    }
  };

  const getCarts = async () => {
    let res = await GetCarts();
    if (res) {
     setCarts(res);
     console.log(res)
    }
  };

  const getMembers = async () => {
    let res = await GetMembers();
    if (res) {
      setMembers(res);
    }
  };
  
  
  const getPaymentTypes = async () => {
    let res = await GetPaymenttypes();
    if (res) {
      setPaymentTypes(res);
    }
  };

  useEffect(() => {
    getEmployees()
    getCarts();
    getMembers();
    getPaymentTypes();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      ReceiptSum: typeof receipts.ReceiptSum === "string" ? parseFloat(receipts?.ReceiptSum) : 0,
      ReceiptPaymentAmount: typeof receipts.ReceiptPaymentAmount === "string" ? parseFloat(receipts?.ReceiptPaymentAmount) : 0,
      ReceiptChange: typeof receipts.ReceiptChange === "string" ? parseFloat(receipts?.ReceiptChange) : 0,
      ReceiptTime: receipts.ReceiptTime,
      PaymentTypeID: convertType(receipts.PaymenttypeID),
      CartID: convertType(receipts.CartID),
      MemberID: convertType(receipts.MemberID),
      EmployeeID: convertType(receipts.EmployeeID),
    };

    let res = await Receipts(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          Complete
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          Incomplete
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1, }}>
            <Typography
              component="h1"
              variant="h6"
              color="primary"
              gutterBottom
            >
              RECEIPT ISSUSED
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Cart ID</p>
              <Select
                native
                value={receipts.CartID + ""}
                onChange= {(e) => handleChange(e)}
                inputProps={{
                  name: "CartID",
                }}
                
              >
                <option aria-label="None" value="">
                  Choose Your Order
                </option>
                {carts.map((item: CartInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Payment Type</p>
              <Select
                native
                value={receipts.PaymenttypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PaymentTypeID",
                }}
              >
                <option aria-label="None" value="">
                  choose payment type
                </option>
                {paymenttypes.map((item: PaymentTypeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Paymenttype}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Member</p>
              <Select
                native
                value={receipts.MemberID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "MemberID",
                }}
              >
                <option aria-label="None" value=""> choose The Member</option>
                {carts.map((item: CartInterface) => (
                  <option value= {item.ID} key= {item.ID}> 
                  {item.Member?.FirstName} {item.Member?.LastName} </option>
                ))}
               
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Employee</p>  
              <Select
                native               
                value={receipts.EmployeeID + ""}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label="None" value=""></option>
                <option value={employees?.ID} key={employees?.ID}>
                  {employees?.FirstName} {employees?.LastName}
                </option>    
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>Date/Time</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={receipts.ReceiptTime}
                  onChange={(newValue) => {
                    setReceipts({
                      ...receipts,
                      ReceiptTime: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>Net Total</p>
            <TextField
                id="ReceiptSum"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="Enter Net Total"
                value={receipts.ReceiptSum || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
            <p>Payment Amount*</p>
            <TextField
                id="ReceiptPaymentAmount"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="Enter Payment Amount"
                value={receipts.ReceiptPaymentAmount || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
            <p>Change</p>
            <TextField
                id="ReceiptChange"
                variant="outlined"
                type="number"
                size="medium"
                placeholder="Enter Change"
                value={receipts.ReceiptChange || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="inherit"
            >
              BACK
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              CREATE
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}export default ReceiptCreate;
