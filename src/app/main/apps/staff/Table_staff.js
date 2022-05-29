import React, { useEffect, Fragment } from "react";
import { motion } from "framer-motion";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from "@lodash";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Table_staff() {
  const classes = useStyles();
  let history=useHistory()
  const [rows, setrows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const columns = [
    { id: "avatar", label: "Avatar", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
      align: "right",
    },
    {
      id: "Action",
      label: "Action",
      minWidth: 170,
      align: "right",
    },
  ];
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    getAllStaff();
  }, []);

  function createData(image, name, email, role, action) {
    const avatar = <Avatar className="md:mx-4" src={image} alt="k" />;
    const Action = (
      <Fragment>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => deleteStaf(action)}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => history.push('/apps/edit_staf/'+action)}
        >
          <CreateIcon />
        </IconButton>
      </Fragment>
    );
    return { avatar, name, email, role, Action };
  }
  const deleteStaf = (id) => {
    axios
    .delete("http://localhost:3200/api/delete_staff/"+id)
    .then((res) => {
      getAllStaff()

    })
    .catch((err) => console.log(err));
  };
  const getAllStaff = () => {
    axios
      .get("http://localhost:3200/api/get_staff")
      .then((res) => {
        console.log("stafff", res.data.data);
        createRows(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const createRows = (data) => {
    let T = [];
    for (let i = 0; i < data.length; i++) {
      T.push(
        createData(
          data[i].avatar,
          data[i].name,
          data[i].email,
          data[i].role,
          data[i]._id
        )
      );
    }
    console.log("here T", T);
    setrows(T);
  };
  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col-12 flex-auto items-center justify-center p-16 sm:p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-max">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <Typography
                variant="h6"
                className="mt-16 mb-24 font-semibold text-18 sm:text-24"
              >
                Table Staff
              </Typography>

              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column, idCol) => (
                        <TableCell
                          key={idCol}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, idRow) => {
                        return (
                          <Fragment  key={idRow}>
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                             
                            >
                              {columns.map((column, idCol) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={idCol} align={column.align}>
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          </Fragment>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
