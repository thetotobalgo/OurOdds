from fake_useragent import UserAgent
from bs4 import BeautifulSoup
import requests

def get_page():
    url = "https://www.netbet.fr/football?tab=a-venir"
    ua = UserAgent()
    response = requests.get(url, headers={'User-Agent': ua.random}) 
    html = BeautifulSoup(response.content, 'html.parser')
    return html

def get_games():

    games = []
    html = get_page()
    games_elements = html.select(".nb-flex-row")

    for el in games_elements:
        team1 = el.select(".nb-match_actor")[0].text
        team2 = el.select(".nb-match_actor")[1].text

        if(len(el.select(".nb-odds_amount")) <= 2):
            continue
        
        odd1 = el.select(".nb-odds_amount")[0].text
        odd2 = el.select(".nb-odds_amount")[1].text
        odd3 = el.select(".nb-odds_amount")[2].text

        #print(team1, team2, odd1, odd2, odd3)
        odds = [odd1, odd2, odd3]
    
        games.append({
            'team1': team1,
            'team2': team2,
            'odds': odds,
        })

    return games


