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
        if data['matches'][game]['sportId'] != 1 :
            continue

        team1 = data['matches'][game]['competitor1Name']
        team2 = data['matches'][game]['competitor2Name']
        betId = data['matches'][game].get('mainBetId')
        if betId is None or str(betId) not in data['bets']:
            continue  # Skip this game if betId is invalid

        bet = data['bets'][str(betId)].get('outcomes')
        if not bet or len(bet) < 3:
            continue  # Ensure there are exactly 3 outcomes

        odds = [
            data['odds'][str(bet[0])],
            data['odds'][str(bet[1])],
            data['odds'][str(bet[2])]
        ]

        games.append({
            'team1': team1,
            'team2': team2,
            'odds': odds,
        })
    return games
