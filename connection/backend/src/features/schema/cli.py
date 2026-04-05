from pathlib import Path
from typing import Annotated

import typer

from features.schema.service import generate_schemas, get_schema

cli = typer.Typer(name="schema")


@cli.command()
def generate(
    output_path: Annotated[
        Path, typer.Argument(help="Путь к файлу со схемой")
    ],
) -> None:
    generate_schemas(output_path)

@cli.command()
def get() -> None:
    get_schema()
