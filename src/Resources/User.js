import React from "react";
import {
  Resource,
  List,
  Datagrid,
  ImageInput,
  ImageField,
  TextField,
  ArrayField,
  ArrayInput,
  Edit,
  SimpleForm,
  Show,
  TextInput,
  TabbedShowLayout,
  Tab,
  EmailField,
  RichTextField,
  DateField,
  NumberField,
  BooleanField,
  ReferenceManyField,
  EditButton,
  ReferenceArrayInput,
  ReferenceInput,
  SelectInput,
  SelectArrayInput,
  Create
} from "react-admin";

import {  } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Demo from './demo';

import pic from "./unknown.png"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));



const UsersActiveField = props => {
  if (!props.record) {
    return null;
  }
  if (props.record.active) {
    return <div>Active</div>;
  }
  return <div>Not Active</div>;
};

const UsersList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <EmailField source="email" />
      <TextField source="role" />
      <TextField source="school" />
    </Datagrid>
  </List>
);

// add this to Edit below to avoid the problem
//<BooleanInput source="active" />
const UsersEdit = props => (
  <Edit {...props}>
    <SimpleForm>
<br/>
    <div source="id">{props.id}</div>

      <TextInput source="email" />
      <TextInput source="school" />
      <SelectInput source="role" choices={[
    { id: 'STAFF', name: 'Staff' },
    { id: 'STUDENT', name: 'Student' },
]} />
<Demo />

    </SimpleForm>
  </Edit>
);

const UsersCreate = props => (

  <Create {...props}>
    <SimpleForm>
    <Demo />
  <TabbedShowLayout>
              <Tab label="summary">
              <TextInput source="email" />
              <TextInput type="password" source="password"/>
              </Tab>
              <Tab label="Picture" path="body">
              <Avatar src={pic} className={useStyles("large")} />
              <ImageInput source="pictures" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
              </Tab>
          </TabbedShowLayout>
    </SimpleForm>
  </Create>
);

const Users = {
  resourceName: "users",
  resource: (
    <Resource
      name="user"
      list={UsersList}
      edit={UsersEdit}
      create={UsersCreate}
      options={{ label: "Users" }}
    />
  )
};

export default Users;
//<UsersActiveField />
