from django.http import JsonResponse
from django.shortcuts import render
from bs4 import BeautifulSoup
import requests


def get_table_results(league):
    five_league = {
        'england': 'https://matchtv.ru/football/england/stats',
        'spain': 'https://matchtv.ru/football/spain/stats',
        'italy': 'https://matchtv.ru/football/italy/stats',
        'germany': 'https://matchtv.ru/football/germany/stats',
        'france': 'https://matchtv.ru/football/france/stats'
    }

    r = requests.get(five_league[league], '')
    soup = BeautifulSoup(r.text, 'lxml')
    table_tag = soup.find('table', 'global-table global-table_mode_modern show-t')

    rows = table_tag.find_all('tr')

    headers = [row.text.strip() for row in rows[0].find_all('td')]

    table_res = []
    for row in rows[1:]:
        cols = [col.text.strip() for col in row.find_all('td')]
        table_res.append(cols)

    icons = [icon.find('img').get('src') for icon in table_tag.find_all('td', class_="info table-link")]

    sl_league = {"headers": headers, "rows": table_res, "icons": icons}

    return sl_league


def index(request):
    leagues = [
        ('Premier League', 'england'),
        ('La Liga', 'spain'),
        ('Serie A', 'italy'),
        ('Bundesliga', 'germany'),
        ('Ligue 1', 'france')
    ]
    return render(request, 'bot/index.html', {'leagues': leagues})


def league_table(request, league):
    table = get_table_results(league)
    return JsonResponse(table)

print('test')