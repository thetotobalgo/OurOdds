from fake_useragent import UserAgent
from bs4 import BeautifulSoup
import requests

def get_page():
    url = "https://www.zebet.fr/fr/sport/13-football"
    ua = UserAgent()
    response = requests.get(url, headers={'User-Agent': ua.random}) 
    html = BeautifulSoup(response.content, 'html.parser')
    return html

def get_games():

    games = []
    html = get_page()
    games_elements = html.select(".event-to-print")

    #print(games_elements)

    for el in games_elements:
        full_text = el.select(".uk-text-truncate")[0].text

        teams = full_text.split(" / ")
        team1 = teams[0]
        team2 = teams[1]


        if(len(el.select(".pmq-cote")) <= 2):
            continue
        
        odd1 = el.select(".pmq-cote")[0].text
        odd2 = el.select(".pmq-cote")[1].text
        odd3 = el.select(".pmq-cote")[2].text

        clean_odd1 = float(odd1.strip().replace(',', '.'))
        clean_odd2 = float(odd2.strip().replace(',', '.'))
        clean_odd3 = float(odd3.strip().replace(',', '.'))

        odds = [clean_odd1, clean_odd2, clean_odd3]

        games.append({
            'team1': team1,
            'team2': team2,
            'odds': odds,
        })

    return games


