let countriesData = [];
let worldwideData = [];

// Charts Data ===========================================

let dailyChangeCases = [];
let dailyChangeDeaths = [];
let dailyChangeRecovered = [];

let totalChange = [];
let totalDeaths = [];
let totalRecovered = [];

let countryTotalChange = [];
let countryTotalDeaths = [];
let countryTotalRecovered = [];

// 1 ** MAPS =============================================


var myMap = L.map('mapid').setView([25.505, -0.09], 2);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    // maxZoom: 5,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(myMap);

var latLong = [];

// 2 ** CHARTS =============================================

var options = {
    series: [
        {
            name: 'Daily Covid Cases',
            data: []
        },
        {
            name: 'Daily Covid Deaths',
            data: []
        }
    ],
    chart: {
        type: 'area',
        stacked: false,
        height: "330px",
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        },
        animations: {
            enabled: true,
            easing: 'ease',
            speed: 200,
            animateGradually: {
                enabled: false,
                delay: 10
            },
            dynamicAnimation: {
                enabled: true,
                speed: 550
            }
        }
    },
    theme: {
        mode: 'light',
        palette: 'palette3',
        monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                if (!val) {
                    return;
                }
                let new1 = val.toFixed(1);
                let new2 = Math.round(new1);
                return numberWithCommas(new2);
            },
        },
        title: {
            text: 'Recorded Numbers'
        },
    },
    xaxis: {
        type: 'datetime',
    },
    dataLabels: {
        enabled: false
    },


    tooltip: {
        y: [
            {
                title: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            {
                title: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        ]
    },
};


var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();


$("#chart-dropdown").on("change", function () {

    console.log("Chainging....", this.value);

    if (this.value === "1") {
        console.log("ONe");

        chart.updateSeries([
            {
                name: 'Daily Covid Cases',
                data: dailyChangeCases
            },
            {
                name: 'Daily Covid Deaths',
                data: dailyChangeDeaths
            }
        ])
    }

    if (this.value === "2") {
        console.log("Two");


        chart.updateSeries([
            {
                name: 'Total Cases',
                data: totalChange
            },
            {
                name: 'Total Deaths',
                data: totalDeaths
            },
            {
                name: 'Total Recovered',
                data: totalRecovered
            }
        ])
    }

});

// 2.5 2ND CHART ================================================================


var options2 = {
    series: [
        {
            name: 'Daily Covid Cases',
            data: []
        },
        {
            name: 'Daily Covid Deaths',
            data: []
        }
    ],
    chart: {
        type: 'area',
        stacked: false,
        height: "100%",
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        },
        animations: {
            enabled: true,
            easing: 'ease',
            speed: 200,
            animateGradually: {
                enabled: false,
                delay: 10
            },
            dynamicAnimation: {
                enabled: true,
                speed: 550
            }
        }
    },
    theme: {
        mode: 'light',
        palette: 'palette3',
        monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
        },
    },

    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        },
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                if (!val) {
                    return;
                }

                let new1 = val.toFixed(1);
                let new2 = Math.round(new1);
                return numberWithCommas(new2);
            },
        },
        title: {
            text: 'Recorded Numbers'
        },
    },
    xaxis: {
        type: 'datetime',
    },
    tooltip: {
        y: [
            {
                title: {
                    formatter: function (val) {
                        return val
                    }
                }
            },
            {
                title: {
                    formatter: function (val) {
                        return val
                    }
                }
            }
        ]
    },
};

var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();



// ** 3 TABLES ====================================================================


let table1 = $('#table1').DataTable({
    paging: false,
    mark: true,
    responsive: true,
    scrollY: "420px",
    scrollX: true,
    columns: [
        {
            data: "country",
            width: "10%"
        },
        {
            data: "cases",
            width: "10%",
            render: $.fn.dataTable.render.number(',', 2, '')
        },

        {
            data: "deaths",
            width: "10%",
            render: $.fn.dataTable.render.number(',', 2, '')
        },
        {
            data: "recovered",
            width: "10%",
            render: $.fn.dataTable.render.number(',', 2, '')
        },
        {
            data: "tests",
            width: "10%",
            render: $.fn.dataTable.render.number(',', 2, '')
        },
        {
            data: "deathsPerOneMillion",
            width: "10%",
            render: $.fn.dataTable.render.number(',', 2, '')
        },

        {
            data: "todayCases",
            width: "10%",
            render: $.fn.dataTable.render.number(',', 2, '')
        },
    ]
});

// Start Func =====================================================

function startFunc() {
    console.log("APP IS STARTING...");

    /* 1) All data for summary facts.
       2) Collect all countries data.
       3) Collects cases, deaths and recovered worldwide timeseries.
       4) Collects timeseries data for uk for about tab.
    */

    Promise.all([
        fetch(`https://disease.sh/v3/covid-19/all`),
        fetch(`https://disease.sh/v3/covid-19/countries`),
        fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=400`),
        fetch(`https://disease.sh/v3/covid-19/historical/UK?lastdays=5000`)
    ])

        .then((response) => Promise.all(response.map((res) => res.json())))
        .then((data) => {

            worldwideData.push(data[0]);
            countriesData.push(...data[1]);


            // 1) ***  Populate Covid facts ==================================================

            $("#total-cases").html(numberWithCommas(data[0].cases));
            $("#total-deaths").html(numberWithCommas(data[0].deaths));
            $("#total-recovered").html(numberWithCommas(data[0].todayRecovered));
            $("#total-countries").html(data[0].affectedCountries);


            // 2)  *** Add Circles to Map ======================================================

            data[1].forEach(function (coord) {
                var circle = L.circle([coord.countryInfo.lat, coord.countryInfo.long], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: coord.deaths * 9
                }).bindTooltip(`${coord.country} : ${numberWithCommas(coord.deaths)} deaths`).openTooltip()

                if (coord.deaths > 0) {
                    circle.addTo(myMap);
                }
            });


            // 3) ******  Add cases/deaths/recovered to apex charts =============================================== 


            for (let x = 0; x < Object.keys(data[2].cases).length; x++) {
                if (x !== Object.keys(data[2].cases).length - 1) {

                    let temp = [];
                    let deaths = [];
                    let recovered = [];

                    temp.push(Object.keys(data[2].cases)[x], Object.values(data[2].cases)[x + 1] - Object.values(data[2].cases)[x]);
                    dailyChangeCases.push(temp);

                    deaths.push(Object.keys(data[2].deaths)[x], Object.values(data[2].deaths)[x + 1] - Object.values(data[2].deaths)[x]);
                    dailyChangeDeaths.push(deaths);

                    recovered.push(Object.keys(data[2].recovered)[x], Object.values(data[2].recovered)[x + 1] - Object.values(data[2].recovered)[x]);
                    dailyChangeRecovered.push(recovered);

                    // Cumulative totals =======================
                    totalChange.push([Object.keys(data[2].cases)[x], Object.values(data[2].cases)[x]]);
                    totalDeaths.push([Object.keys(data[2].deaths)[x], Object.values(data[2].deaths)[x]]);
                    totalRecovered.push([Object.keys(data[2].recovered)[x], Object.values(data[2].recovered)[x]]);
                }
            }

            chart.updateSeries([
                {
                    name: 'Daily Covid Cases',
                    data: dailyChangeCases
                },
                {
                    name: 'Daily Covid Deaths',
                    data: dailyChangeDeaths
                }
            ])


            // 4** Table Populate =========================================================

            let tableOne = $('#table1').dataTable();
            tableOne.fnAddData(data[1]);


            // 5 ** POPULATE SEARCH CHART =========================================================


            for (let x = 0; x < Object.keys(data[3].timeline.cases).length; x++) {

                if (x !== Object.keys(data[3].timeline.cases).length - 1) {

                    countryTotalChange.push([Object.keys(data[3].timeline.cases)[x], Object.values(data[3].timeline.cases)[x]]);
                    countryTotalDeaths.push([Object.keys(data[3].timeline.deaths)[x], Object.values(data[3].timeline.deaths)[x]]);
                    countryTotalRecovered.push([Object.keys(data[3].timeline.recovered)[x], Object.values(data[3].timeline.recovered)[x]]);
                }
            }

            chart2.updateSeries([
                {
                    name: 'Total Covid Cases',
                    data: countryTotalChange
                },
                {
                    name: 'Total Covid Deaths',
                    data: countryTotalDeaths
                },
                {
                    name: 'Total Covid Recovered',
                    data: countryTotalRecovered
                }
            ])


            // 6 *** Populate Countries Dropdown ==================================================


            for (let x = 0; x < countriesData.length; x++) {

                console.log(countriesData[x]);
                if (countriesData[x].country !== "worldwide") {
                    jQuery('<option>', {
                        value: countriesData[x].country,
                        html: countriesData[x].country
                    }).appendTo(".dropdown1");
                }
            }

            $(".dropdown1").val("UK");


            // 7 *** Populate FACTS ================================================================

            setTimeout(() => {

                let chosenCountry = countriesData.filter((country) => country.country === "UK");
                let template = `
            <div class='grid-2'>
            <div>
                <label>Active Cases</label>
                <p>${numberWithCommas(chosenCountry[0].active) || "__not provided___"}</p>
                </div>

                <div>
                <label>Critical Cases</label>
                <p>${numberWithCommas(chosenCountry[0].critical) || "__not provided___"}</p>
                </div>
                <div>
                <label>Total Deaths</label>
                <p>${numberWithCommas(chosenCountry[0].deaths) || "__not provided___"}</p>
                </div>
                <div>
                <label>Total Deaths per Million</label>
                <p>${chosenCountry[0].deathsPerOneMillion || "__not provided___"}</p>
                </div>
                <div>
                <label>Total population</label>
                <p>${numberWithCommas(chosenCountry[0].population) || "__not provided___"}</p>
                </div>
                <div>
                <label>Total recovered</label>
                <p>${numberWithCommas(chosenCountry[0].recovered) || "__not provided___"}</p>
                </div>
                <div>
                <label>Daily Deaths</label>
                <p>${chosenCountry[0].todayDeaths || "__not provided___"}</p>
                </div>
                <div>
                <label>Daily Cases</label>
                <p>${chosenCountry[0].todayCases || "__not provided___"}</p>
                </div>
                <div>
                <label>Daily Recovered</label>
                <p>${chosenCountry[0].todayRecovered || "__not provided___"}</p>
                </div>
            </div>`

                $("#country-facts").html(template);
                $("#chosen-country").html(`<h3>${chosenCountry[0].country || "__not provided___"}</h3>`)
            }, 10);

        })
        .catch((err) => console.log(err));



}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Dropdown Coutnry Change =================================================


$(".dropdown1").on("change", function () {

    countryTotalChange = [];
    countryTotalDeaths = [];
    countryTotalRecovered = [];

    $("#facts-spinner").css({ "opacity": 1, "display": "block" })
    $("#country-facts").html("");


    fetch(`https://disease.sh/v3/covid-19/historical/${this.value}?lastdays=400`, {

    }).then((res) => res.json())
        .then((data) => {
            console.log(data);

            if (data.message === "Country not found or doesn't have any historical data") {
                alert("No Historical Data for this country, please choose another!");
                return;
            }


            for (let x = 0; x < Object.keys(data.timeline.cases).length; x++) {
                if (x !== Object.keys(data.timeline.cases).length - 1) {
                    countryTotalChange.push([Object.keys(data.timeline.cases)[x], Object.values(data.timeline.cases)[x]]);
                    countryTotalDeaths.push([Object.keys(data.timeline.deaths)[x], Object.values(data.timeline.deaths)[x]]);
                    countryTotalRecovered.push([Object.keys(data.timeline.recovered)[x], Object.values(data.timeline.recovered)[x]]);
                }
            }

            chart2.updateSeries([
                {
                    name: 'Total Covid Cases',
                    data: countryTotalChange
                },
                {
                    name: 'Total Covid Deaths',
                    data: countryTotalDeaths
                },
                {
                    name: 'Total Covid Recovered',
                    data: countryTotalRecovered
                }
            ])


            let uk = countriesData.filter((country) => country.country === this.value);
            let chosenCountry = countriesData.filter((country) => country.country === this.value);

            let template = `
        <div class='grid-2'>
            <div>
            <label>Active Cases</label>
            <p>${numberWithCommas(chosenCountry[0].active) || "__not provided___"}</p>
            </div>

            <div>
            <label>Critical Cases</label>
            <p>${numberWithCommas(chosenCountry[0].critical) || "__not provided___"}</p>
            </div>
            <div>
            <label>Total Deaths</label>
            <p>${numberWithCommas(chosenCountry[0].deaths) || "__not provided___"}</p>
            </div>
            <div>
            <label>Total Deaths per Million</label>
            <p>${chosenCountry[0].deathsPerOneMillion || "__not provided___"}</p>
            </div>
            <div>
            <label>Total population</label>
            <p>${numberWithCommas(chosenCountry[0].population) || "__not provided___"}</p>
            </div>
            <div>
            <label>Total recovered</label>
            <p>${numberWithCommas(chosenCountry[0].recovered) || "__not provided___"}</p>
            </div>
            <div>
            <label>Daily Deaths</label>
            <p>${chosenCountry[0].todayDeaths || "__not provided___"}</p>
            </div>
            <div>
            <label>Daily Cases</label>
            <p>${chosenCountry[0].todayCases || "__not provided___"}</p>
            </div>
            <div>
            <label>Daily Recovered</label>
            <p>${chosenCountry[0].todayRecovered || "__not provided___"}</p>
            </div>
        </div>`

            $("#country-facts").html(template);
            $("#chosen-country").html(`<h3>${chosenCountry[0].country || "__not provided___"}</h3>`);
            $("#facts-spinner").css({ "opacity": 0, "display": "none" })

        })
        .catch((err) => {
            console.log(err)
        });
})


// *** Listeners ==================================================================

$("#left-home").on("click", function () {

    $("#right").addClass("show");
    $("#right-facts").removeClass("show");
    $("#right-search").removeClass("show");

    setTimeout(() => {
        myMap.invalidateSize()
    }, 10);
});

$("#left-about").on("click", function () {
    $("#right").removeClass("show");
    $("#right-facts").addClass("show");
    $("#right-search").removeClass("show");
});

$("#left-search").on("click", function () {
    $("#right-search").addClass("show");
    $("#right").removeClass("show");
    $("#right-facts").removeClass("show");
});

// Highlight Chosen Page Blue 
$("#left-about, #left-home, #left-search").on("click", function () {
    $("li").removeClass("active");
    $(this).addClass("active");
});



window.addEventListener("resize", function () {
    setTimeout(() => {
        myMap.invalidateSize()
    }, 10);
})


