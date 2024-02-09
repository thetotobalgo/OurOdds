import requests

def get_page():
    url = "https://parisportif.pmu.fr/home/wrapper/dashboard?lang=fr&activeSportId=1"
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})    
    return response.text