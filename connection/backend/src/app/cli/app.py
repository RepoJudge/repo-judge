from typer import Typer

from features.schema.cli import cli as schema

cli_app = Typer(name="connection")

cli_app.add_typer(schema)
