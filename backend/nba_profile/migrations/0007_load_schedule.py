# Generated by Django 2.1.3 on 2018-11-28 01:24
import json
from django.utils.dateparse import parse_datetime

from django.db import migrations

# The apps config that is passed to the callbacks doesn't seem to have
# the path, so import the "current" apps state and get the path from that
from django.apps import apps as current_apps
DATA_DIR = current_apps.get_app_config('nba_profile').path + "/data"


def load_schedule(apps, schema_editor):
    NBAGame = apps.get_model('nba_profile', 'NBAGame')
    NBATeam = apps.get_model('nba_profile', 'NBATeam')
    with open('{}/schedule_2018.json'.format(DATA_DIR)) as f:
        games = json.load(f)

        for g in games:
            if 'tags' in g and 'PRESEASON' in g['tags']:
                # preseason games have non-nba teams apparently
                continue

            game = NBAGame(
                nba_game_id=g['gameId'],
                start_time_utc=parse_datetime(g['startTimeUTC']),
                nugget=g['nugget']['text'],
                home_team=NBATeam.objects.get(nba_id=int(g['hTeam']['teamId'])),
                visitor_team=NBATeam.objects.get(nba_id=int(g['vTeam']['teamId']))
            )
            game.save()


class Migration(migrations.Migration):

    dependencies = [
        ('nba_profile', '0006_nbagame'),
    ]

    operations = [
        migrations.RunPython(load_schedule)
    ]
