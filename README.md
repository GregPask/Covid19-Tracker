# Covid 19 Tracker
> Covid dashboard tracker app using disease.sh api for live data.

## Live Version
https://tracker-covid-api.netlify.app/

## Installation

``` bash


# Install dependencies 
> npm install

# Build static assetts 
> gulp dev

# Live server
> npm i -g live-server
> live-server --port=8082


```



## API ENDPOINTS

``` bash

1) All stats        - `https://disease.sh/v3/covid-19/all`

2) Stats by Country - `https://disease.sh/v3/covid-19/countries`

3) Stats by ID      - `https://disease.sh/v3/covid-19/countries/<id>`

4) Historical       - `https://disease.sh/v3/covid-19/historical/all?lastdays=120`

5) All Historical   - `https://disease.sh/v3/covid-19/historical/all` <countryname timeseries>

6) CompareCountries - `https://disease.sh/v3/covid-19/countries/{country,country,...}`

7) Compare time     - `/v3/covid-19/historical/{country,country,...}`



```

