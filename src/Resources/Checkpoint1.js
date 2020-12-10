import React from "react";
import {
  Resource,
  List,
  Datagrid,
  TextField,
  ArrayField,
  ArrayInput,
  NumberInput,
  Edit,
  SimpleForm,
  SimpleFormIterator,
  DateInput,
  TextInput,
  Pagination,
  Create
} from "react-admin";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MyNeighborsField from './MyNeighborsField.js';
import MyQRField from './MyQRField.js';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

let ttl = localStorage.getItem('ttl')

const PostPagination = ({ page, perPage, total, setPage }) => {
    console.log("TTL");
    console.log(ttl);
    const nbPages = Math.ceil(total / perPage) || 1;
    console.log("nbPAGEEEEEEEEEEEES");
    console.log(nbPages);
    console.log("perPAGE");
    console.log(perPage);
    console.log("PAGE "+page);

    return (
        nbPages > 1 &&
            <Toolbar>
                {page > 1 &&
                    <Button color="primary" key="prev" icon={ChevronLeft} onClick={() => setPage(page - 1)}>
                        Prev
                    </Button>
                }
                {page !== nbPages &&
                    <Button color="primary" key="next" icon={ChevronRight} onClick={() => setPage(page + 1)} labelPosition="before">
                        Next
                    </Button>
                }
            </Toolbar>
    );
}
const CheckpointsActiveField = props => {
  if (!props.record) {
    return null;
  }
  if (props.record.active) {
    return <div>Active</div>;
  }
  return <div>Not Active</div>;
};

const schooll = localStorage.getItem("school");
const school = schooll.charAt(0).toUpperCase() + schooll.slice(1)
const CheckpointsList = props => (

//pagination={<PostPagination />}
  <List {...props} filter={{q: school}} perPage={100}>
    <Datagrid rowClick="edit" title="Post edition">
      <MyQRField source="id"/>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="building" />
      <TextField source="checkpointType" />
      <TextField source="floor" />
      <TextField source="school" />
      <TextField source="country" />
      <TextField source="city" />
      <MyNeighborsField source="neighbors"/>





      </Datagrid>
  </List>
);

// add this to Edit below to avoid the problem
//<BooleanInput source="active" />
const CheckpointsEdit = props => (
  <Edit {...props}>
      <SimpleForm>
      <div source="id">{props.id}</div>
        <TextInput source="name" />
        <TextInput source="building" />
        <TextInput source="checkpointType" />
        <NumberInput source="floor" />

          <TextInput source="location.country" />
          <TextInput source="location.city" />
          <TextInput source="location.school" />






        <ArrayInput source="neighbors">
      <SimpleFormIterator>
          <TextInput source="_id" />
          <TextInput source="name" />
          <TextInput source="cost" />
          <TextInput source="direction" />
      </SimpleFormIterator>
  </ArrayInput>
      </SimpleForm>
  </Edit>
);

const CheckpointsCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="building" />
      <TextInput source="checkpointType" />
      <NumberInput source="floor" />

        <TextInput source="location.country" />
        <TextInput source="location.city" />
        <TextInput source="location.school" />






      <ArrayInput source="neighbors">
    <SimpleFormIterator>
        <TextInput source="_id" />
        <TextInput source="name" />
        <TextInput source="cost" />
        <TextInput source="direction" />
    </SimpleFormIterator>
</ArrayInput>
    </SimpleForm>
  </Create>
);

const Checkpoints = {
  resourceName: "checkpoints",
  resource: (
    <Resource
      name="checkpoint"
      list={CheckpointsList}
      edit={CheckpointsEdit}
      create={CheckpointsCreate}
      options={{ label: "Checkpoints" }}
    />
  )
};

export default Checkpoints;
//<TextInput source="country" />
//<TextInput source="city" />
//<TextInput source="school" />
