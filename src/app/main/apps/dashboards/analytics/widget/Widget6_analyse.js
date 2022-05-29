import Paper from "@material-ui/core/Paper";

import Typography from "@material-ui/core/Typography";
import _ from "@lodash";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import format from "date-fns/format";

function Widget6_analyse(props) {
  const { series } = props;
  const [rows, setrows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const columns = [
    { id: "table", label: "Nom de Tableau", minWidth: 170 },
    { id: "tache", label: "Nom de Tache", minWidth: 170 },
    { id: "checklists", label: "Nom de contrôle", minWidth: 170 },
    {
      id: "checkItems",
      label: "Sousnom de contrôle",
      minWidth: 170,
      align: "right",
    },
    {
      id: "dateCreated",
      label: "date debut",
      minWidth: 170,
      align: "right",
    },
    {
      id: "dateFinsh",
      label: "date fin",
      minWidth: 170,
      align: "right",
    },
  ];
  useEffect(() => {
    console.log("seriesseries", series);
    createRows();
  }, []);

  function createData(
    table,
    tache,
    checklists,
    checkItems,
    dateCreated,
    dateFinsh
  ) {
    return { table, tache, checklists, checkItems, dateCreated, dateFinsh };
  }
  const createRows = () => {
    let data = series;
    let T = [];
    for (let i = 0; i < data.length; i++) {
      let Finsh = "";

      for (let k = 0; k < data[i].checklists.checkItems.length; k++) {
        if (data[i].checklists.checkItems[k].dateFinsh === null) {
          Finsh = "En cours";
        } else {
          Finsh = format(
            new Date(data[i].checklists.checkItems[k].dateFinsh),
            "dd MMM yyyy"
          );
        }
        let created= format(
            new Date(data[i].checklists.checkItems[k].dateCreated),
            "dd MMM yyyy"
          );

        T.push(
          createData(
            data[i].table,
            data[i].tache,
            data[i].checklists.name,
            data[i].checklists.checkItems[k].name,
            created,
            Finsh
          )
        );
      }
    }
    setrows(T);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20">
        <Typography className="text-16 font-medium">
          Table de Lists de contrôle
        </Typography>
      </div>
      <div className="w-full md:w-12/11 p-16 min-h-420 h-420">
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, idRow) => {
                  return (
                    <Fragment key={idRow}>
                      <TableRow hover role="checkbox" tabIndex={-1}>
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
      </div>
    </Paper>
  );
}

export default Widget6_analyse;
