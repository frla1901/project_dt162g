<!-- Projekt - DT162G, JavaScript-baserad webbutveckling 
    Skapad av Frida Lazzari 2020-->
<template>
  <div class="container">
    <p class="error" v-if="error">{{ error }}</p>
    <!--FORM-->
    <!-- Vue: v-model som kopplar ihop fält och värden i formulärets fält med de som finns i databasen -->
    <form class="form" action="#">
      <h2>Rapportera</h2>

      <!--Select för anställda-->
      <label for="name">Namn:</label><br />
      <select v-model="name" id="name" name="name" required>
        <option disabled value="">Välj i listan:</option>
        <option>Abelardo</option>
        <option>Bruno</option>
        <option>Giorgio</option>
        <option>Giovanni</option>
        <option>Frida</option>
        </select
      ><br />
      <!--Select vecka arbetad-->
      <label for="week">Vecka</label><br />
      <select v-model.number="week"
        id="week"
        name="week"
        required>  
        <option disabled value="">Välj i listan:</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        </select><br />

      <!--Select för veckodag-->
      <label for="day">Veckodag:</label><br />
      <select v-model="day" id="day" name="day" required>
        <option disabled value="">Välj i listan:</option>
        <option>Måndag</option>
        <option>Tisdag</option>
        <option>Onsdag</option>
        <option>Torsdag</option>
        <option>Fredag</option>
        <option>Lördag</option>
        <option>Söndag</option></select
      ><br />
      <!--Input från vilken tid-->
      <label for="from">Från kl:</label><br />
      <input
        type="text"
        v-model="from"
        id="from"
        name="from"
        placeholder="7.00"
        required
      /><br />
      <!--Input till vilken tid-->
      <label for="to">Till kl:</label><br />
      <input
        type="text"
        v-model="to"
        id="to"
        name="to"
        placeholder="16.00"
        required
      /><br />
      <!--Input var har arbetet utförts/vad har gjorts-->
      <label for="place">Info om dagen/veckan:</label><br />
      <textarea
        id="place"
        v-model="place"
        name="place"
        placeholder="Byggprojekt, företag, adress, hämtat material, ATF, semester, föräldraledig, sjuk...."
        cols="15"
        rows="5"
        required
      ></textarea
      ><br />
      <!--Knapp för att rapportera in en ny post till rapporten-->
      <button id="createBtn" @click="createReport">Rapportera</button>
    </form>

<!--LISTA/RAPPORT-->
    <div class="list">
      <br />
      <hr />
      <br />
      <h2>Rapport</h2>
      <!-- RAPPORTENS TABELL -->
      <table>
        <thead>
          <tr>
            <!-- Rubriker i tabellen -->
            <th>Namn</th>
            <th>Vecka</th>
            <th>Dag</th>
            <th>Från</th>
            <th>Till</th>
            <th>Info om dagen</th>
          </tr>
        </thead>
        <tbody class="report-post">
        <!-- Vue: v-for utför en for-loop av arrayen posts, v-bind(:)kopplar ihop databasens fält och värden till tabellen -->
          <tr
            v-for="post in posts"
            :key="post._id"
            :name="post.name"
            :week="post.week"
            :day="post.day"
            :from="post.from"
            :to="post.to"
            :place="post.place"
          >
        <!-- Vue: v-if kör en if sats, sen körs v-on:(@)click för att starta metoden, {{ }} skickar med varje fält/värde per post -->
        <!-- v-else gör däreften en else sats, v-model som kopplar ihop fält och värden i tabellens fält med de som finns i databasen -->
            <td v-if ="!post.editmode" @click="enterEditmode(post)">{{ post.name }}</td>
            <input class="input-field" v-else v-model="post.name" style="color:#757575;"/>
            <td v-if ="!post.editmode" @click="enterEditmode(post)">{{ post.week }}</td>
            <input class="input-field" v-else v-model="post.week" style="color:#757575;"/>
            <td v-if ="!post.editmode" @click="enterEditmode(post)">{{ post.day }}</td>
            <input class="input-field" v-else v-model="post.day" style="color:#757575;" />
            <td v-if ="!post.editmode" @click="enterEditmode(post)">{{ post.from }}</td>
            <input class="input-field" v-else v-model="post.from" style="color:#757575;" />
            <td v-if ="!post.editmode" @click="enterEditmode(post)">{{ post.to }}</td>
            <input class="input-field" v-else v-model="post.to" style="color:#757575;"/>
            <td v-if ="!post.editmode" @click="enterEditmode(post)">{{ post.place }}</td>
            <input class="input-field" v-else v-model="post.place" style="color:#757575;"/>
            
            <!-- Knappar för spara och ta bort-->
            <!-- Vue: v-on:(@)click kör metoder för att spara/uppdatera samt ta bort posten -->
            <td><button id="updateBtn" @click="updateReport(post._id,post.name,post.week,post.day,post.from,post.to,post.place)">Spara</button>
            </td>
            <td><button id="deleteBtn" @click="deletePost(post._id)">X</button>
            </td>
            
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>

<!-- JavaScript -->
<script>
import ReportService from "../ReportService";
// exporterar Komponenten Reportlist 
// innehåller data som returnerar en array posts, eventuella felmeddelanden samt namn på alla fält med tomma värden
export default {
  name: "Reportlist",
  data() {
    return {
      posts: [],
      error: "",
      name: "",
      week: "",
      day: "",
      from: "",
      to: "",
      place: "",
    };
  },
// asynkron funktion för att hämta all poster i databasen med hjälp av funktionen getPosts som skapats i ReportService.vue
  async created() {
    try {
      this.posts = await ReportService.getPosts();
      this.list = this.posts.length;
      // loggar hur många poster det finns i databasen
      console.log("Antal poster this.list:" + this.list);
      // eventuella felmeddelande skrivs ut
    } catch (err) {
      this.error = err.message;
    }
    this.name = "",
    this.week = "",
    this.day = "",
    this.from = ""       
    this.to = "",
    this.place = "";
  },
// metoder 
  methods: {
    // skapa post 
    async createReport() {
      await ReportService.insertReport(
        this.name,
        this.week,
        this.day,
        this.from,
        this.to,
        this.place
      );
      this.Reportlist = await ReportService.getPosts();
    },
    // ta bort post
    async deletePost(id) {
      await ReportService.deletePost(id);
      this.posts = await ReportService.getPosts();
    },
    // updatera/spara post
    async updateReport(id, name, week, day, from, to, place) {
      await ReportService.updatePost(id, name, week, day, from, to, place);
      this.posts = await ReportService.getPosts();
    },
    // öppna upp för att kunna justera en post
    enterEditmode(post) {
      post.editmode = true;
      this.posts = [...this.posts];
    },
  },
};
</script>

<!-- CSS för alla storlekar/enheter -->
<style>
.container {
  width: 100%;
  margin: 0 auto;
}
h2 {
  font-size: 5vw;
  width: 94%;
  height: auto;
  margin-left: 3%;
  padding: 0 0 2% 0;
  font-family: "Papyrus", sans-serif;
}

form {
  width: 76%;
  margin: 3% 12%;
  padding: 3% 0 12% 0;
  text-align: left;
  background-color: #a5a4a47a;
  box-shadow: 3px 3px #7575757a;
  border-radius: 3px;
}

form h2 {
  text-shadow: 1.5px 1.5px #ffffff;
}

form label {
  font-size: 2.8vw;
  font-weight: bold;
  width: 94%;
  margin-left: 3%;
}

select, input {
  font-size: 2.4vw;
  width: 94%;
  height: auto;
  margin-left: 3%;
  padding: 5px;
  border: 1px solid #7575757a;
}

textarea {
  font-size: 2.4vw;
  width: 94%;
  height: auto;
  margin: 0 3%;
  padding: 5px;
  border: #7575757a;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#createBtn {
  float: right;
  width: 25%;
  margin: 3%;
  padding: 6px 3px;
  font-weight: bold;
  font-size: 2.4vw;
  color: #ffffff;
  background-color: #19be4b;
  border: 1px solid #7575757a;
  border-radius: 3px;
  box-shadow: 1px 1px #757575;
}

.list {
  width: 100%;
}

table thead tr th {
  font-size: 2.8vw;
  font-weight: bold;
  padding: 0 1.2em 0 0;
  text-align: left;
}

td {
  font-size: 2.4vw;
  text-align: left;
  padding: 0 1.2em 0 0;
  margin-bottom: 12px;
  border-bottom: 1px solid #000000;
  color: #000000;
}

#updateBtn {
  margin: 1em 0;
  padding: 0.5em;
  font-weight: bold;
  font-size: 2vw;
  background-color: #ffffff;
  border: 1px solid #7575757a;
  border-radius: 3px;
  box-shadow: 1px 1px #757575;
}

#deleteBtn {
  margin: 1em 0;
  padding: 0.5em;
  font-weight: bold;
  font-size: 2vw;
  color: red;
  background-color: #ffffff;
  border: 1px solid #7575757a;
  border-radius: 3px;
  box-shadow: 1px 1px #757575;
}

.input-field {
  font-size: 2vw;
  margin-left: 3%;
  padding: 10px;
  border: 2px solid #757575;
  color: #757575;
}

hr {
  margin-top: 2%;
  border-color: #555;
}
p.error {
  border: 1px solid darkred;
  background-color: pink;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
