# NYC H&H Covid Testing Wait Times

Uses GitHub Actions to run a recurring job that downloads the city's [public testing site wait times PDF](https://hhinternet.blob.core.windows.net/wait-times/testing-wait-times.pdf) and converts it into a CSV and then [updates a gist](https://gist.github.com/ctbarna/98b660129b01a5a2c050f3bab78aad70).

The script was written based on the formatting of the PDF on 12/17/2021.

## Setup
1. `git clone git@github.com:ctbarna/covid-wait-times.git`
2. `python -m venv venv` (Or setup a virtual environment in your own way)
3. `pip install -r requirements.txt`
4. `python __init__.py`