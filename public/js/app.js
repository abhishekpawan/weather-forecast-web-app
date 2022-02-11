var to

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var yyyy = today.getFullYear();


// today = dd + ',' + yyyy
// document.write(today);


const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday", "Monday"]
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
var week = weekdays[today.getDay()]
var week1 = weekdays[today.getDay()+1]
var week2 = weekdays[today.getDay()+2]
var month = monthNames[today.getMonth()]

var date = dd +' ' + month + ' , ' + yyyy


document.querySelector(".location .week").textContent = week;
document.querySelector(".first .week").textContent = week1
document.querySelector(".second .week").textContent = week2
document.querySelector('.date').textContent = date

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('.searchTerm')
const loadingContent = document.querySelector('.loadingContent')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location= searchElement.value

    loadingContent.classList.toggle('d-none')

    // loadingContent.innerHTML =""

   

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data)=>{
        if(data.error && !data.error.message){
            loadingContent.classList.toggle('d-none')

            document.querySelector('.error-1').innerHTML = data.error

            setTimeout(()=>{
                document.querySelector('.error-1').classList.toggle('d-none')

            },2000)
        }
  
        else (
            loadingContent.classList.toggle('d-none'),

            document.querySelector(".icon").innerHTML = '<img class="img-fluid" src="'+ data.current.condition.icon +'" /><p class="forecast">-----</p>',
            document.querySelector('.forecast').innerHTML = data.current.condition.text,
            document.querySelector('.spanLocation').innerHTML = data.location.name +", "+ data.location.region + ", " + data.location.country,
            document.querySelector('.location .temp').innerHTML = 'Current Temp '+ data.current.temp_c + '<sup>&deg;</sup> C',
            document.querySelector('.location .rain').innerHTML = 'Chances of rain: '+ data.forecast[0].day.daily_chance_of_rain +'%',
            document.querySelector('.forecasts .wind').innerHTML = 'Wind Speed: ' + data.current.wind_kph + ' kph',
            document.querySelector('.forecasts .humidity').innerHTML = 'Humidity: ' + data.current.humidity,
            // console.log(data.forecast[])

            document.querySelector(".first .icon").innerHTML = '<img class="img-fluid" src="'+ data.forecast[1].day.condition.icon +'" /><p class="forecast">-----</p>',
            document.querySelector('.first .forecast').innerHTML = data.forecast[1].day.condition.text,
            document.querySelector('.first .temp').innerHTML = 'Max '+ data.forecast[1].day.maxtemp_c + '<sup>&deg;</sup>C <br> Min '+ data.forecast[1].day.mintemp_c+'<sup>&deg;</sup>C',

            document.querySelector(".second .icon").innerHTML = '<img class="img-fluid" src="'+ data.forecast[2].day.condition.icon +'" /><p class="forecast">-----</p>',
            document.querySelector('.second .forecast').innerHTML = data.forecast[2].day.condition.text,
            document.querySelector('.second .temp').innerHTML = 'Max '+ data.forecast[2].day.maxtemp_c + '<sup>&deg;</sup>C <br> Min '+ data.forecast[1].day.mintemp_c+'<sup>&deg;</sup>C'

        )
    })

})
})
0
