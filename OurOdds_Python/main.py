import betclic
import winamax
import netbet

import zebet
import unibet
import pmu


from fuzzywuzzy import process

def find_common_matches(betclic_games, winamax_games):
    threshold = 90
    common_matches = []
    for betclic_game in betclic_games:
        betclic_team1 = betclic_game['team1']
        betclic_team2 = betclic_game['team2']
        winamax_teams = [(game['team1'], game['team2']) for game in winamax_games]
        winamax_teams_flat = [team for sublist in winamax_teams for team in sublist]
        best_match_team1 = process.extractOne(betclic_team1, winamax_teams_flat, score_cutoff=threshold)
        best_match_team2 = process.extractOne(betclic_team2, winamax_teams_flat, score_cutoff=threshold)
        if best_match_team1 and best_match_team2:
            for winamax_game in winamax_games:
                if best_match_team1[0] in winamax_game.values() and best_match_team2[0] in winamax_game.values():
                    common_match = {
                        'betclic_game': betclic_game,
                        'winamax_game': winamax_game,
                        'team1': betclic_team1,
                        'team2': betclic_team2
                    }
                    common_matches.append(common_match)
                    break
    return common_matches

def calculate_margin(odds):
    return (1 - sum(1/o for o in odds)) * 100

def get_best_odds_bookmaker_and_margin_for_matches(common_matches):
    best_odds_and_margin_matches = []
    for match in common_matches:
        betclic_odds = match['betclic_game']['odds']
        winamax_odds = match['winamax_game']['odds']
        best_odds_win, bookmaker_win = max((betclic_odds[0], 'betclic'), (winamax_odds[0], 'winamax'), key=lambda x: x[0])
        best_odds_draw, bookmaker_draw = max((betclic_odds[1], 'betclic'), (winamax_odds[1], 'winamax'), key=lambda x: x[0])
        best_odds_lose, bookmaker_lose = max((betclic_odds[2], 'betclic'), (winamax_odds[2], 'winamax'), key=lambda x: x[0])
        best_odds = [best_odds_win, best_odds_draw, best_odds_lose]
        margin = calculate_margin(best_odds)
        match_info_with_margin = {
            'team1': match['team1'],
            'team2': match['team2'],
            'odds_info': [
                {'outcome': 'win', 'odds': best_odds_win, 'bookmaker': bookmaker_win},
                {'outcome': 'draw', 'odds': best_odds_draw, 'bookmaker': bookmaker_draw},
                {'outcome': 'lose', 'odds': best_odds_lose, 'bookmaker': bookmaker_lose}
            ],
            'margin': margin
        }
        best_odds_and_margin_matches.append(match_info_with_margin)
    return best_odds_and_margin_matches

def print_matches_with_best_odds_and_bookmaker(matches_with_odds_and_margin):
    for match in matches_with_odds_and_margin:
        print(f"{match['team1']} vs {match['team2']}")
        for odds_info in match['odds_info']:
            print(f"{odds_info['outcome']}: {odds_info['bookmaker']}: {odds_info['odds']}")
        print(f"Margin: {match['margin']:.2f}%\n")

betclic_games = betclic.get_games()
winamax_games = winamax.get_games()
netbet_games = netbet.get_games()
common_matches = find_common_matches(betclic_games, winamax_games)
best_odds_and_margin_matches = get_best_odds_bookmaker_and_margin_for_matches(common_matches)
print_matches_with_best_odds_and_bookmaker(best_odds_and_margin_matches)

print(netbet_games)
#print(unibet.get_page())
#print(zebet.get_page())

