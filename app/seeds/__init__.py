from flask.cli import AppGroup
from .users import seed_users, undo_users
from .decks import seed_decks, undo_decks
from .questions import seed_questions, undo_questions
from .reviews import seed_reviews, undo_reviews
from .deck_questions import seed_deck_questions, undo_deck_questions
from .incorrect_answers import seed_incorrect_answers, undo_incorrect_answers
from .correct_answers import seed_correct_answers, undo_correct_answers
from .messages import seed_messages, undo_messages

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_questions()
        undo_decks()
        undo_reviews()
        undo_deck_questions()
        undo_incorrect_answers()
        undo_correct_answers()
        undo_messages()
    seed_users()
    seed_questions()
    seed_decks()
    seed_reviews()
    seed_deck_questions()
    seed_incorrect_answers()
    seed_correct_answers()
    seed_messages()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_questions()
    undo_decks()
    undo_reviews()
    undo_deck_questions()
    undo_incorrect_answers()
    undo_correct_answers()
    undo_messages()
    # Add other undo functions here
