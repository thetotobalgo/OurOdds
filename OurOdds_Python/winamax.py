import requests
import json
from fake_useragent import UserAgent


def get_page():

    ua = UserAgent()
    url = "https://www.winamax.fr/paris-sportifs/sports/1"
    response = requests.get(url, headers={'User-Agent': ua.random})    
    return response.text

def get_json():
    html = get_page()
    s1 = html.split("var PRELOADED_STATE = ")[1]
    s2 = s1.split(";</script>")[0]
    return json.loads(s2)

def get_games():
    data = get_json()
    games = []
    for game in data['matches']:

        # Ligue 1
        if (data['matches'][game]['sportId'] != 1) and (data['matches'][game]['tournamentId'] != 4):
            continue

        team1 = data['matches'][game]['competitor1Name']
        team2 = data['matches'][game]['competitor2Name']
        betId = data['matches'][game]['mainBetId']
        bet =  data['bets'][str(betId)]['outcomes']
        if (len(bet) != 3):
            continue
        odds = [
            data['odds'][str(bet[0])],
            data['odds'][str(bet[1])],
            data['odds'][str(bet[2])]
        ]

        #print(team1, team2, odds)
        #margin = calculate_margin(odds)

        games.append({
            'team1': team1,
            'team2': team2,
            'odds': odds,
        })
    return games