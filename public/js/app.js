console.log('Client side js is loaded');

function fetchWeatherData() {
    document.querySelector('#result').innerHTML = 'Loading...';
    fetch('http://localhost:3001/weather?address='+document.querySelector('#address').value)
     .then(resp => {
         resp.json().then(data => {
            if (data.err) {
                document.querySelector('#result').innerHTML = `<b style='color:red'>Error: ${JSON.stringify(data.err, null, 1)}</b>`;
            } else {
               document.querySelector('#result').innerHTML = data.result;
            }
         });
     }).catch(() => {
        document.querySelector('#result').innerHTML = `<b style='color:red'>Error: Enable to fetch the data</b>`;
     })
}