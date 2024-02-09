import axios from 'axios';

const API_KEY = "b133382dcf33d120ca3366b536afb278";
const API_URL = "https://api.the-odds-api.com/v4/sports";

export const fetchOddsData = async (region = "eu") => {
    try {
        const response = await axios.get(`${API_URL}/soccer/odds/?apiKey=${API_KEY}&regions=${region}&markets=h2h`);
        //console.log(response.data); // Print data in the console
        return response.data;
    } catch (error) {
        console.error("Error fetching data from The Odds API", error);
        return null;
    }
};
