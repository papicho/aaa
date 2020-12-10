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

const MyPicturesField = ({ record = {}, source }) => {
    const classes = useStyles();
    if (record[source])
    {
      return (
              //{record[source]}


          <img
              src={record[source]}
              style={{width: 170, height: 200}}
            />

      );
    }
    else
    {
      return (
              //{record[source]}


          <img
              src={require("./unknown.png")}
              alt="No Picture"
              style={{width: 170, height: 200}}
            />

      );
    }

}

export default MyPicturesField;
