<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title
          >Projekte
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="projects"
          :search="search"
          show-expand
          single-expand
          item-key="projId"
        >
          <template v-slot:item.icon="{ item }">
            <v-img
              class="mx-auto"
              aspect-ratio="1"
              max-width="48"
              :src="require(`@/assets/icons/${item.icon}.png`)"
            />
          </template>
          <template v-slot:item.points="{ item }">
            {{ item.points.reduce((sum, elm) => (sum += elm), 0) }}
          </template>
          <template v-slot:item.members="{ item }">
            {{ item.members.join(", ") }}
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <h4 class="my-3">Points received:</h4>
              <p>{{ item.points }}</p>
              <h4 class="my-3">Description:</h4>
              <p class="mb-3">{{ item.description }}</p>
            </td>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-3" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <template>
          <v-dialog v-model="dialogUpdate" max-width="500px">
            <v-card>
              <v-card-title class="headline">Projekt Editieren </v-card-title>
              <v-card-text>
                <v-text-field
                  label="Titel"
                  v-model="editedItem.title"
                ></v-text-field>
                <v-textarea
                  label="Description"
                  v-model="editedItem.description"
                ></v-textarea>
                <v-text-field
                  label="Klasse"
                  v-model="editedItem.grade"
                ></v-text-field>
                <v-text-field
                  label="Jahr"
                  v-model="editedItem.year"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialogUpdate = !dialogUpdate"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  @click="
                    save;
                    dialogUpdate = !dialogUpdate;
                  "
                  text
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      projects: [],
      headers: [
        {
          text: "Icon",
          align: "start",
          sortable: false,
          filterable: false,
          value: "icon",
        },
        { text: "Titel", value: "title" },
        { text: "Klasse", value: "grade" },
        { text: "Jahr", value: "year" },
        { text: "Mitglieder", value: "members" },
        { text: "Punkte", sortable: false, filterable: false, value: "points" },
        {
          text: "Aktionen",
          value: "actions",
          sortable: false,
          filterable: false,
          align: "center",
        },
      ],
      search: "",
      dialogUpdate: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {
        title: "",
        description: 0,
        grade: 0,
        year: 0,
      },
    };
  },
  methods: {
    async getData() {
      let res = await axios.get("http://localhost:3000/itpProjects");
      this.projects = res.data;
    },
    async deleteItem(item) {
      await axios.delete(`http://localhost:3000/itpProjects/${item.projId}`);
      this.projects = this.projects.filter((elm) => elm.projId != item.projId);
    },
    editItem(item) {
      this.editedItem = item;
      this.dialogUpdate = true;
    },
    async save() {
      await axios.put(
        `http://localhost:3000/itpProjects/`,
        this.editedItem
      );
      this.projects.push(this.editedItem);
    },
  },
  created() {
    this.getData();
  },
};
</script>
