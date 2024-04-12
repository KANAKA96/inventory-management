import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { fetchInventory } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../utils/darkTheme";

const Body = ({ toggleState }) => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.inventory);
  let [openDialog, setDialouge] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [disabledRows, setDisabledRows] = useState([]);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDisableRow = (id) => {
    setDisabledRows([...disabledRows, id]);
  };

  const isRowDisabled = (id) => {
    return disabledRows.includes(id);
  };
  const InventoryTable = (data) => {
    return (
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Value</TableCell>
                <TableCell className="align-middle items-center">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  style={{
                    opacity: isRowDisabled(index) && !toggleState ? 0.5 : 1,
                  }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <div className="flex">
                      <EditIcon
                        sx={{ color: toggleState ? "gray" : "green" }}
                        className="mr-4 transform hover:scale-110 cursor-pointer"
                        onClick={() =>
                          !isRowDisabled(index) &&
                          !toggleState &&
                          handleOpenDialog(item)
                        }
                      />
                      <VisibilityOffIcon
                        sx={{ color: toggleState ? "gray" : "pink" }}
                        className="mr-4 transform hover:scale-110 cursor-pointer"
                        onClick={() => !toggleState && handleDisableRow(index)}
                      />
                      <DeleteIcon
                        sx={{ color: toggleState ? "gray" : "red" }}
                        className="mr-4 transform hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    );
  };

  let getTotal = () => {
    return data.reduce(
      (acc, el) => acc + parseInt(el.price.replace("$", "")),
      0
    );
  };

  let outOfStock = () => {
    let notInStock = data.filter((el) => el.quantity === 0);
    return notInStock.length;
  };

  let uniqueCategories = new Set(data.map((item) => item.category));
  let categoryCount = uniqueCategories.size;

  let handleClose = () => {
    setDialouge(false);
  };

  let handleOpenDialog = (data) => {
    setRowData(data);
    setDialouge(true);
  };

  return (
    <div className="pt-4 ml-3 mr-3">
      <div className="text-white text-3xl ">Inventory Stats</div>
      <div className="flex flex-wrap pt-6">
        <div className="text-white bg-green-950 rounded-md w-[292px] h-32 p-4 mr-5">
          <ShoppingCartIcon sx={{ color: "white" }} className="mr-4" />
          Total product
          <div className="ml-[42px] text-3xl">{data.length}</div>
        </div>
        <div className="text-white bg-green-950 rounded-md w-[292px] h-32 p-4 mr-5">
          <CurrencyExchangeIcon sx={{ color: "white" }} className="mr-4" />
          Total Store Value
          <div className="ml-[42px] text-3xl">{"$" + getTotal()}</div>
        </div>
        <div className="text-white bg-green-950 rounded-md w-[292px] h-32 p-4 mr-5">
          <RemoveShoppingCartIcon sx={{ color: "white" }} className="mr-4" />
          Out of Stock
          <div className="ml-[42px] text-3xl">{outOfStock()}</div>
        </div>
        <div className="text-white bg-green-950 rounded-md w-[292px] h-32 p-4">
          <CategoryIcon sx={{ color: "white" }} className="mr-4" />
          No of Category
          <div className="ml-[42px] text-3xl">{categoryCount}</div>
        </div>
      </div>
      <div className="mr-[10px] pt-4">{InventoryTable(data)}</div>
      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#333333",
            },
          }}
        >
          <div className="p-6 text-white ">
            <div className="flex  justify-between">
              <div className="text-xl">Edit Product</div>
              <CloseIcon
                sx={{ color: "#b9eb3d" }}
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>
            <div className="pb-6">{rowData?.name}</div>
            <div className="flex justify-between pb-6">
              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                value={rowData?.category}
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                  },
                  marginRight: "20px",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Price"
                variant="outlined"
                value={rowData?.price}
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                className="mr-5"
              />
            </div>
            <div className="flex justify-between pb-6">
              <TextField
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                value={rowData?.quantity}
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                  },
                  marginRight: "20px",
                }}
              />
              <TextField
                id="outlined-basic"
                label="Value"
                variant="outlined"
                value={rowData?.value}
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                className="mr-5"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleClose}
                sx={{ color: "#b9eb3d" }}
                className="mr-2 cursor-pointer"
              >
                Close
              </Button>
              <Button sx={{ color: "#848c85" }}>Save</Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Body;
