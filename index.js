const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    loading();
    const proxyUrl = 'https://desolate-anchorage-64195.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        document.getElementById("quote").innerText = data.quoteText;
        if(data.quoteAuthor === ""){
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
           } else{
            quoteText.classList.remove('long-quote');
           }
        complete();
    }catch(error){
        getQuote();
        console.log(error);
    }
}
function tweetQuote() {
    const quote =document.getElementById("quote").innerText;
    const author = document.getElementById("author").innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

document.getElementById("new-quote").addEventListener('click',getQuote);
document.getElementById("twitter").addEventListener('click',tweetQuote);


getQuote();