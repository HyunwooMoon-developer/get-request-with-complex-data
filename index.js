/* eslint-disable no-const-assign */
/* eslint-disable no-extra-semi */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use strict';

const api_Key = 'baKcjUccFZiqktIJ3nDaQUnesn8L4wmZmQokaaKW';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

const formatQueryParams = function(params){
    const queryItem = Object.keys(params)
             .map(key => `${(key)}=${(params[key])}}`)
    return queryItem.join('&');
}

const displayResults = function(Json){
    $('#results-list').empty();
    for(let i = 0 ; i < Json.data.length ; i++){
        $('#resluts-list').append(
            `<li>
            <h4>${Json.data[i].fullname}</h4>
            <p>${Json.data[i].description}</p>
            <p><a href="${Json.data[i].url}">Link</a></p>
            </li>`
        );
        $('#results').removeClass('hidden');
    };
};

const getNationalPark = function(code){
    let stateCode = code.split(',');
    let stateCodeStr = '';
    for(let i = 0 ; i < stateCode.length; i++){
        stateCodeStr += `${stateCode[i].trim().toUpperCase()}`}
    let url = `${searchURL}?statecode=${stateCodeStr}&api_key=${api_Key}`;
    console.log(url);
    
    fetch(url)
    .then(response=>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(Json=> displayResults(Json))
    .catch((e)=>{
        $('#js-error-message').text(`Something went wrong: ${e.message}`);
    });
}



function watchForm(){
    $('#js-form').on('submit', event=>{
        event.preventDefault();
        const searchTerm = $('#js-search-form').val();
        const maxResults = $('#js-max-results').val();
        getNationalPark(searchTerm, maxResults);
});
}

$(watchForm);