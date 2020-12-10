import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Resource,
  TextInput,
  ArrayField,
  NumberField,
  NumberInput,
  TabbedForm,
  FormTab,
  required,
  //   Edit,
  Create,
  Filter,
  ArrayInput,
  SimpleFormIterator,
  minLength,
  maxLength,
  minValue,
  maxValue,
  number,
  choices,
  SelectInput,
  Edit,
} from "react-admin";

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyQRField from './MyQRField.js';


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

const validateName = [required(), minLength(2), maxLength(30)];
const validateBuilding = [required(), minLength(2), maxLength(30)];
const validateFloor = [required(), number(), minValue(0), maxValue(99)];
const validateCheckpointType = choices(
  ["Salle", "Ascenseur", "Escaliers", "Couloir", "Terrace", "Bureau"],
  "Type must be Salle, Ascenseur, Escaliers, Couloir, Terrace or Bureau"
);
const validateSchool = [required(), minLength(2), maxLength(30)];
const validateCountry = [required(), minLength(2), maxLength(30)];
const validateCity = [required(), minLength(2), maxLength(30)];
const validateCost = [required(), number(), minValue(0), maxValue(50)];
const validateNeighborDirection = choices(["Gauche", "Droite", "Face", "N/A"]);

const CheckpointTitle = ({ record }) => {
  return <span>Checkpoint {record ? `"${record.name}"` : ""}</span>;
};

const CheckpointList = (props) => (
  <List {...props} filter={{q: school}} perPage={5}>
    <Datagrid rowClick="edit">
      {/* ADD expand={<CheckpointPanel />} if needed*/}
      <MyQRField source="id"/>
      <TextField source="_id" />
      <TextField source="name" validate={validateName} />
      <TextField source="building" validate={validateBuilding} />
      <NumberField source="floor" validate={validateFloor} />
      <TextField source="checkpointType" validate={validateCheckpointType} />
      <TextField
        source="location.school"
        label="School"
        validate={validateSchool}
      />
      <TextField
        source="location.country"
        label="Country"
        validate={validateCountry}
      />
      <TextField source="location.city" label="City" validate={validateCity} />
      <ArrayField source="neighbors">
        <Datagrid>
          {/* IF NEEDED: ADD <TextField source="_id" label="Checkpoint ID" /> */}
          <TextField source="name" label="Name" validate={validateName} />
          <NumberField
            source="cost"
            label="Distance(m)"
            validate={validateCost}
          />
          <TextField
            source="direction"
            label="Direction"
            validate={validateNeighborDirection}
          />
        </Datagrid>
      </ArrayField>
      <EditButton />
    </Datagrid>
  </List>
);

const CheckpointEdit = (props) => (
  <Edit title={<CheckpointTitle />} {...props}>
    <TabbedForm>
      <FormTab label="Checkpoint">
        <TextInput disabled source="id" />
        <TextInput source="name" validate={validateName} />
        <TextInput source="building" validate={validateBuilding} />
        <NumberInput source="floor" validate={validateFloor} />
        <SelectInput
          label="Checkpoint Type"
          source="checkpointType"
          choices={[
            { id: "Salle", name: "Salle" },
            { id: "Ascenseur", name: "Ascenseur" },
            { id: "Escaliers", name: "Escaliers" },
            { id: "Couloir", name: "Couloir" },
            { id: "Terrace", name: "Terrace" },
            { id: "Bureau", name: "Bureau" },
          ]}
          validate={validateCheckpointType}
        />
        <TextInput
          source="location.school"
          label="School"
          validate={validateSchool}
        />
        <TextInput
          source="location.country"
          label="Country"
          validate={validateCountry}
        />
        <TextInput
          source="location.city"
          label="City"
          validate={validateCity}
        />
      </FormTab>
      <FormTab label="Neighbors">
        <ArrayInput source="neighbors" label="Edit neighbors">
          <SimpleFormIterator>
            <TextInput source="_id" label="Neighbor's ID" />
            <TextInput
              source="name"
              label="Neighbor's name"
              validate={validateName}
            />
            <NumberInput
              source="cost"
              label="Distance to neighbor"
              validate={validateCost}
            />
            <SelectInput
              label="Direction to neighbor"
              source="direction"
              choices={[
                { id: "Gauche", name: "Gauche" },
                { id: "Droite", name: "Droite" },
                { id: "Face", name: "Face" },
                { id: "N/A", name: "N/A" },
              ]}
              validate={validateNeighborDirection}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

const CheckpointCreate = (props) => (
  <Create {...props}>
    <TabbedForm redirect="list">
      <FormTab label="Checkpoint">
        <TextInput source="name" validate={validateName} />
        <TextInput source="building" validate={validateBuilding} />
        <NumberInput source="floor" validate={validateFloor} />
        <SelectInput
          label="Checkpoint Type"
          source="checkpointType"
          choices={[
            { id: "Salle", name: "Salle" },
            { id: "Ascenseur", name: "Ascenseur" },
            { id: "Escaliers", name: "Escaliers" },
            { id: "Couloir", name: "Couloir" },
            { id: "Terrace", name: "Terrace" },
            { id: "Bureau", name: "Bureau" },
          ]}
          validate={validateCheckpointType}
        />
        <TextInput
          source="location.school"
          label="School"
          validate={validateSchool}
        />
        <TextInput
          source="location.country"
          label="Country"
          validate={validateCountry}
        />
        <TextInput
          source="location.city"
          label="City"
          validate={validateCity}
        />
      </FormTab>
      <FormTab label="Neighbors">
        <ArrayInput source="neighbors" label="Add neighbors">
          <SimpleFormIterator>
            <TextInput source="_id" label="Neighbor's ID" />
            <TextInput
              source="name"
              label="Neighbor's name"
              validate={validateName}
            />
            <NumberInput
              source="cost"
              label="Distance to neighbor"
              validate={validateCost}
            />
            <SelectInput
              label="Direction to neighbor"
              source="direction"
              choices={[
                { id: "Gauche", name: "Gauche" },
                { id: "Droite", name: "Droite" },
                { id: "Face", name: "Face" },
                { id: "N/A", name: "N/A" },
              ]}
              validate={validateNeighborDirection}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Create>
);

const Checkpoints = {
  resourceName: "checkpoints",
  resource: (
    <Resource
      name="checkpoint"
      list={CheckpointList}
      edit={CheckpointEdit}
      create={CheckpointCreate}
      options={{ label: "Checkpoints" }}
    />
  )
};
export default Checkpoints;
