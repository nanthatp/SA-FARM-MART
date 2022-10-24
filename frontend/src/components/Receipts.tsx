import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ReceiptInterface } from "../interfaces/IReceipt";
import { GetReceipts } from "../services/HttpClientService";

function Receipts() {
  const [receipts, setReceipts] = useState<ReceiptInterface[]>([]);

  useEffect(() => {
    getReceipts();
  }, []);

  const getReceipts = async () => {
    let res = await GetReceipts();
    if (res) {
      setReceipts(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ID", width: 50 },
    {
      field: "ReceiptTime",
      headerName: "Receipt Time",
      width: 250,
      valueFormatter: (params) => params.value.ReceiptTime,
    },
    {
      field: "ReceiptSum",
      headerName: "Receipt Sum",
      width: 150,
      valueFormatter: (params) => params.value.ReceiptSum,
    },
    {
      field: "ReceiptPaymentAmount",
      headerName: "Receipt Payment Amount",
      width: 150,
      valueFormatter: (params) => params.value.ReceiptPaymentAmount,
    },
    {
      field: "ReceiptChange",
      headerName: "Receipt Change",
      width: 150,
      valueFormatter: (params) => params.value.ReceiptChange,
    },
    {
      field: "Paymenttype",
      headerName: "Paymenttype",
      width: 150,
      valueFormatter: (params) => params.value.Paymenttype,
    },
    {
      field: "Cart",
      headerName: "Cart",
      width: 150,
      valueFormatter: (params) => params.value.ID,
    },
    {
      field: "Employee",
      headerName: "Employee",
      width: 150,
      valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName,
    },
    {
      field: "Member",
      headerName: "Member",
      width: 150,
      valueFormatter: (params) => params.value.FirstName + " " + params.value.LastName,
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
              Receipt/Invoice recods
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="inherit"
            >
              BACK
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={receipts}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Receipts;