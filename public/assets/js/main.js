// event listener to enter word in search bar
document.getElementById( 'searchButton' ).addEventListener( 'click', function() {
    const searchTerm = document.getElementById( 'searchInput' ).value.trim();
    if (searchTerm !== '') {
        getData( searchTerm );
    }
});

// function to fetch first returned definition of word from API
async function getData( word ) {
    try {
        const response = await fetch(`https://api.urbandictionary.com/v0/define?rapidapi-key=abc69a37fbmsh3e5ba78a88e6801p10a1f5jsnee8664f04da6&term=${word}`);
        const result = await response.json();
        // console.log( result );

        if (result.list.length > 0) {
            displayData( result.list[0] );
        } else {
            document.getElementById( 'termResult' ).innerHTML = 'Sorry, no results found.';
        }
    } catch ( error ) {
        console.error( error );
    }
}

function displayData( data ) {
    // change the API date format of the result
    const isoDateString = data.written_on;
    const date = new Date(isoDateString);
    const month = date.toLocaleString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();

    // format the date as "Month day, year"
    const formattedDate = `${month} ${day}, ${year}`;

    // function to remove square brackets from API hyperlinks
    function removeSquareBrackets( text ) {
        return text.replace( /\[([^\]]+)\]/g, '$1' );
    }

    const content = document.querySelector( '#termResult' );
    content.innerHTML = `
        <section class="word-box">
            <h1 class="word">${data.word}</h1>
            <p class="definition api-text">${removeSquareBrackets(data.definition)}</p>
            <p class="example api-text">${removeSquareBrackets(data.example)}</p>
            <p class="author-date">by <span class="author">${data.author}</span> <span class="date">${formattedDate}</span></p>
            
            <div class="thumbs-up-down">
                <div class="upvotes">
                    <img class="thumbs-up-icon" src="/assets/images/icons8-thumbs-up-96.png" alt="thumbs up">
                    <p class="thumbs-up">${data.thumbs_up}</p> 
                </div>
                <div class="downvotes">
                    <img class="thumbs-down-icon" src="/assets/images/icons8-thumbs-down-96.png" alt="thumbs down">
                    <p class="thumbs-down">${data.thumbs_down}</p>
                </div>
            </div>
        </section>
    `;
}

