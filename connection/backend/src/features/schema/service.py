from pathlib import Path
from typing import Any

from rich import print

import yaml
from fastapi import FastAPI


def _generate_schema(output_path: Path, app: FastAPI) -> None:
    """Генерирует OpenAPI-схему и сохраняет её в файл."""

    schema = app.openapi()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(yaml.dump(schema, allow_unicode=True))


def generate_schemas(base_output_path: Path) -> None:
    from app.api.version import app_v1  # noqa

    for path, app in zip(
        [
            base_output_path / "schema" / "v1.yaml",
        ],
        [app_v1],
        strict=True,
    ):
        _generate_schema(path, app)

def get_schema() -> None:
    from app.api.version import app_v1  # noqa

    for app in [app_v1]:
        schema = app.openapi()
        print(schema)
