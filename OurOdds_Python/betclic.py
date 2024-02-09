import requests
import json
def get_page():
    url = "https://www.betclic.fr/football-s1"
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})    
    return response.text



#<script id="ng-state" type="application/json">{"G.json./ext/sports-offer/pub/v3/sports?includeCompetitionGroupsForLayout=EventCategory&includeTops=true":

def get_json():
    html = get_page()
    s1 = html.split('<script id="ng-state" type="application/json">')[1]
    s2 = s1.split('</script>')[0]

    return json.loads(s2)


def get_games():
    data = get_json()
    
    # The key that you're interested in
    key = "G.json./ext/sports-offer/pub/v4/sports/1?hasSwitchMtc=true&limit=20&offset=0&sortBy=ByLiveRankingPreliveDate"
    
    # Attempt to retrieve the JSON data for the key of interest
    data = data.get(key, None)
    
    # Initialize a list to hold all the matches with their odds
    all_matches_with_odds = []
    odd1 = 0
    odd2 = 0
    odd3 = 0

    games = []
    
    # Check if 'body' and 'matches' are in data
    if data and 'body' in data and 'matches' in data['body']:
        for game in data['body']['matches']:
            # Initialize a dictionary for the match with team1, team2, and odds
            
            
            contestants = game.get('contestants', [])
            if len(contestants) >= 2:
                team1 = contestants[0]['name']
                team2 = contestants[1]['name']
            
            grouped_markets = game.get('grouped_markets', [])
            if grouped_markets:
                for market in grouped_markets[0].get('markets', []):
                    for selection in market['selections']:
                        if selection[0].get('name') == team1:
                            odd1 = selection[0].get('odds')
                        if selection[0].get('name') == "Nul":
                            odd2 = selection[0].get('odds')
                        if selection[0].get('name') == team2:
                            odd3 = selection[0].get('odds')
                    
                    odds = [
                        odd1,
                        odd2,
                        odd3
                    ]

                   

            
            games.append({
            'team1': team1,
            'team2': team2,
            'odds': odds,
        })

    return games
