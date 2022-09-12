var container = document.querySelector('.container');
var seats = document.querySelectorAll('.row .seat:not(.occupied)');

var count= document.getElementById('count');
var total=document.getElementById('total');
var movieSelect=document.getElementById('movie');

populateUI();

var ticketPrice= +movieSelect.value;


//save selected movie index and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('movieIndex', movieIndex );
    localStorage.setItem('moviePrice', moviePrice );
    
}

// update selected seats count
function updateSelectedCount(){
    var selectedSeats= document.querySelectorAll('.row .seat.selected');

var seatsIndex = [...selectedSeats].map(function(el){
     return [...seats].indexOf(el);
});

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

var selectedSeatsCount=selectedSeats.length;
count.innerHTML= selectedSeatsCount;
total.innerHTML= selectedSeatsCount*ticketPrice;
}

//populateUI

function populateUI(){
    var selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats!=null && selectedSeats.length>0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index)> -1)
            seat.classList.add('selected');
        });
    }

    var selectedMovieIndex= localStorage.getItem('movieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


//movie selection
    movieSelect.addEventListener('change',function(e){
        ticketPrice= e.target.value;
        setMovieData(e.target.selectedIndex , e.target.value);
        updateSelectedCount();
    })


container.addEventListener('click',function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    e.target.classList.toggle('selected')
    updateSelectedCount();
})

updateSelectedCount();