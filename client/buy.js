const button = document.getElementById('buy-button');

button.addEventListener('click', () => {
    fetch('http://localhost:3000/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                { id: '1234x', quantity: 1 },
                { id: '2345y', quantity: 1 },
                { id: '3456z', quantity: 3 }
            ]
        })
    }).then(res => {
        if (res.ok) return res.json();
        return res.json().then(err => Promise.reject(err));
    }).then(data => {
        console.log(data);
        window.location = data.url;
    }).catch(err => {
        console.log(err);
    });
});