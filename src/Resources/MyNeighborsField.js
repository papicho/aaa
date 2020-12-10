import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LaunchIcon from '@material-ui/icons/Launch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});

const MyNeighborsField = ({ record = {}, source }) => {
    const classes = useStyles();
    //for (const [key, value] of Object.entries(record["neighbors"]))
    //{
      //let tmp = `${key}: ${value}`;
      //console.log(tmp);
    //}
    console.log(Object.entries(record["neighbors"]));
    return (
            //{record[source]}

        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell numeric>Cost</TableCell>
            <TableCell numeric>Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {record[source].map(neighbor => {
            return (
              <TableRow key={neighbor.id}>
                <TableCell component="th" scope="row">
                  {neighbor.slice(neighbor.indexOf('name')+5, neighbor.indexOf(',', neighbor.indexOf('name')+5))}
                </TableCell>
                <TableCell numeric>{neighbor.slice(neighbor.indexOf('id')+3, neighbor.indexOf(',', neighbor.indexOf('id')+3))}</TableCell>
                <TableCell numeric>{neighbor.slice(neighbor.indexOf('cost')+5, neighbor.indexOf(',', neighbor.indexOf('cost')+5))}</TableCell>
                <TableCell numeric>{neighbor.slice(neighbor.indexOf('direction')+10, -1)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
}

export default MyNeighborsField;
