from fake_useragent import UserAgent
from bs4 import BeautifulSoup
import requests

def get_page():
    url = "https://www.zebet.fr/fr/sport/13-football"
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})    
    return response.text


