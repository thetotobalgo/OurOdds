import requests
from fake_useragent import UserAgent


def get_page():
    url = "https://www.unibet.fr/sport/football"
    ua = UserAgent()

    print(ua.random)

    response = requests.get(url, headers={'User-Agent': ua.random})    
    return response.text

