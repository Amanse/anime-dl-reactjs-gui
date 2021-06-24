# coding: utf-8
from anime_downloader.sites.anime import AnimeEpisode
from anime_downloader.sites import ALL_ANIME_SITES
from anime_downloader.sites import get_anime_class
from anime_downloader.config import Config

import eel
import sys


@eel.expose
def get_providers():
    return [Config['dl']['provider'], [x[1] for x in ALL_ANIME_SITES]]


def SearchResult_to_json(SearchResult):
    data = {
        "link": SearchResult.url,
        "title": SearchResult.title,
        "poster": SearchResult.poster
    }
    if type(SearchResult.meta) != str:
        for meta in SearchResult.meta:
            if meta not in data:
                data[meta] = SearchResult.meta[meta]
    return data


def search_using_provider(query, provider):
    provider = get_anime_class(provider)
    search = provider.search(query)
    return [SearchResult_to_json(x) for x in search]


@eel.expose
def search_anime(query, provider):
    return search_using_provider(query, provider)


@eel.expose
def get_metadata(anime_link, provider):
    provider = get_anime_class(provider)
    anime = provider(anime_link)
    anime._scrape_metadata()
    return anime.meta


if __name__ == '__main__':
    if sys.argv[1] == '--develop':
        eel.init('client')
        eel.start(port=8888)
    else:
        eel.init('build')
        eel.start('index.html')
