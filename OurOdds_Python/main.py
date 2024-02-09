from fuzzywuzzy import process

# Placeholder imports for fetching data from bookmakers
import betclic
import winamax
import netbet
import zebet

def get_games_from_bookmaker(bookmaker, bookmaker_name):
    # Fetch games from the bookmaker
    games = bookmaker.get_games()
    # Add a source label for each odd
    for game in games:
        game['source'] = [bookmaker_name] * len(game['odds'])
    return games

def calculate_margin(odds):
    try:
        margin = (1 - sum(1 / odd for odd in odds if odd > 0)) * 100
    except ZeroDivisionError:
        margin = 0
    return round(margin, 2)

def normalize_team_names(games):
    for game in games:
        game['team1'] = game['team1'].lower() if game.get('team1') else "unknown team1"
        game['team2'] = game['team2'].lower() if game.get('team2') else "unknown team2"
    return games

def ensure_float_odds(odds):
    return [float(odd.replace(',', '.')) if isinstance(odd, str) else odd for odd in odds]


def find_highest_odds_for_common_games(*bookmakers_games):
    def is_common_game(game, other_game, threshold=90):
        match_team1 = process.extractOne(game['team1'], [other_game['team1'], other_game['team2']], score_cutoff=threshold)
        match_team2 = process.extractOne(game['team2'], [other_game['team1'], other_game['team2']], score_cutoff=threshold)
        return match_team1 and match_team2

    common_games_with_highest_odds = []

    for game_index, game in enumerate(bookmakers_games[0]):
        # Convert the base game's odds to float
        highest_odds = ensure_float_odds(game['odds'])
        sources = game['source']
        game_is_common = False

        for other_games in bookmakers_games[1:]:
            for other_game in other_games:
                if is_common_game(game, other_game):
                    game_is_common = True
                    # Ensure the comparing game's odds are also floats
                    other_game_odds = ensure_float_odds(other_game['odds'])
                    for k in range(3):
                        if highest_odds[k] < other_game_odds[k]:
                            highest_odds[k] = other_game_odds[k]
                            sources[k] = other_game['source'][k]

        if game_is_common:
            updated_game = game.copy()
            updated_game['odds'] = highest_odds
            updated_game['source'] = sources
            updated_game['margin'] = calculate_margin(highest_odds)
            common_games_with_highest_odds.append(updated_game)

    return common_games_with_highest_odds

# Fetch and normalize games from each bookmaker
betclic_games = normalize_team_names(get_games_from_bookmaker(betclic, "Betclic"))
winamax_games = normalize_team_names(get_games_from_bookmaker(winamax, "Winamax"))
netbet_games = normalize_team_names(get_games_from_bookmaker(netbet, "NetBet"))
zebet_games = normalize_team_names(get_games_from_bookmaker(zebet, "Zebet"))

# Find common games with the highest odds and calculate the margin
common_games_with_highest_odds = find_highest_odds_for_common_games( winamax_games, betclic_games, netbet_games, zebet_games)
# Sort the common games by margin in ascending order
common_games_with_highest_odds_sorted = sorted(common_games_with_highest_odds, key=lambda x: x['margin'])

# Print the common games with the highest odds, their sources, and the calculated margin
# Print the common games with the highest odds, their sources, and the calculated margin in ascending order by margin
for game in common_games_with_highest_odds_sorted:
    print(f"Team1: {game['team1'].title()}, Team2: {game['team2'].title()}, Highest Odds: {game['odds']}, Sources: {game['source']}, Margin: {game['margin']}%")


