# Generated by Django 2.1.3 on 2018-11-28 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('nba_profile', '0009_gamemeta'),
    ]

    operations = [
        migrations.RenameField(
            model_name='playergamestats',
            old_name='def_reb',
            new_name='defReb',
        ),
        migrations.RenameField(
            model_name='playergamestats',
            old_name='off_reb',
            new_name='offReb',
        ),
        migrations.RenameField(
            model_name='playergamestats',
            old_name='pf',
            new_name='pFouls',
        ),
        migrations.RenameField(
            model_name='playergamestats',
            old_name='tot_reb',
            new_name='totReb',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='biggest_lead',
            new_name='biggestLead',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='def_reb',
            new_name='defReb',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='fast_break_points',
            new_name='fastBreakPoints',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='longest_run',
            new_name='longestRun',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='off_reb',
            new_name='offReb',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='pf',
            new_name='pFouls',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='points_in_paint',
            new_name='pointsInPaint',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='points_off_turnovers',
            new_name='pointsOffTurnovers',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='second_chance_points',
            new_name='secondChancePoints',
        ),
        migrations.RenameField(
            model_name='teamgamestats',
            old_name='tot_reb',
            new_name='totReb',
        ),
    ]
