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
  Create
} from "react-admin";
import Button from '@material-ui/core/Button';

const CheckpointsActiveField = props => {
  if (!props.record) {
    return null;
  }
  if (props.record.active) {
    return <div>Active</div>;
  }
  return <div>Not Active</div>;
};

const CheckpointsList = props => (

  <List {...props} >
    <Datagrid rowClick="edit" title="Post edition">
      <TextField source="name" />
      <TextField source="building" />
      <TextField source="checkpointType" />
      <TextField source="floor" />
      <TextField source="school" />
      <TextField source="country" />
      <TextField source="city" />
      <TextField source="neighbors" />
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
