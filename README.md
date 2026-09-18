# hannah-docs

Public documentation for [Hannah](https://github.com/NurPech/hannah), a self-hosted,
German-speaking voice assistant for smart homes. Published at
[hannah-docs.leonie.network](https://hannah-docs.leonie.network/).

## Local development

```bash
pip install -r requirements.txt
mkdocs serve
```

Then open <http://127.0.0.1:8000/>.

## Contributing

Edit or add Markdown files under `docs/`, update the navigation in `mkdocs.yml` if you
added a new page, and open a PR against `main`. A GitHub Actions workflow builds and
deploys the site automatically once merged.
