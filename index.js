/* eslint-disable no-extra-semi */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const apiKey = 'fSQcVK1MgehUr8iuInscSsY8ea6edl4QP7ULzi5k';
const searchURL = 'https://developer.nps.gov/api/v1/park';

function formatQueryParams(){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResult(Json){
    console.log(Json);
    $('#results-list').empty();
    for(let i = 0 ; i < Json.item.length ; i++){
        $('#results-list').append(
            `<li><h3><a href="${Json.item[i].url}">${Json.item[i].title}</h3>
            <p>${Json.item[i].description}</p>
            </li>`
        )};
        $('#results').removeClass('hidden');
}

function getNationalParkArea(query, maxResults = 10){
    const params = {
        key: apiKey ,
        q: query , 
        pageSize: maxResults
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString ;
    console.log(url);
    fetch(url)
    .then(response=>{
        if (response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(Json => displayResult(Json))
    .catch(e => {
        $('#.js-error-message').text(`Something went wrong: ${e.mseeage}`);
    });
}


function watchForm(){
    $('form').on('submit', event=>{
        event.preventDefault();
        const searchTerm = $('#js-search-form').val();
        const maxResults = $('#js-max-results').val();
        getNationalParkArea(searchTerm, maxResults);
});
}

$(watchForm);