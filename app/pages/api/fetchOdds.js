import axios from 'axios';

const API_KEY = "5813825bb8253420e50ac4507a98e5d7";
const API_URL = "https://api.the-odds-api.com/v4/sports";

export const fetchOddsData = async (region = "eu") => {
    try {
        const response = await axios.get(`${API_URL}/soccer/odds/?apiKey=${API_KEY}&regions=${region}&markets=h2h`);
        console.log(response.data); // Print data in the console
        return response.data;
    } catch (error) {
        console.error("Error fetching data from The Odds API", error);
        return null;
    }
};
