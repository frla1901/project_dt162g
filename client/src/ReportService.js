/* Projekt - DT162G, JavaScript-baserad webbutveckling 
    Skapad av Frida Lazzari 2020*/

// denna fil hanterar back-end förfrågningar genom att använda axios istället för t.ex. fetch api
import axios from "axios";

// variabel som hanterar anslutning till back-end. 
// initalt lokalt "http://localhost:3000/api/posts/" och sedan i produktion via proxy "/api/posts/"
const url = "api/posts/";

// klass som innehåller alla förfrågningar
class ReportService {
    // hämta (get) alla inrapporterade poster från databasen
    static getPosts() {
            return new Promise((resolve, reject) => {
                axios
                    .get(url)
                    .then((res) => {
                        const data = res.data;
                        resolve(
                            data.map((post) => ({
                                ...post,
                            }))
                        );
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
        // rapportera in (post) en ny post 
    static insertReport(name, week, day, from, to, place) {
            return axios.post(url, {
                name: name,
                week: week,
                day: day,
                from: from,
                to: to,
                place: place
            });
        }
        // uppdatera (patch) en befintlig post 
    static updatePost(id, name, week, day, from, to, place) {
        return axios.patch(`${url}${id}`, { name, week, day, from, to, place });
    }

    // Ta bort (delete) en befintlig post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

// exportera klassen ReportService
export default ReportService;