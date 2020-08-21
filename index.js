
async function getQuote(){
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const reponse = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById("quote").innerText = data.quoteText;
        console.log(data);
    }catch(error){
        getQuote();
        console.log(error);
    }

}

getQuote();