// Declaration of variables
const URL = 'https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=BRL&include_market_cap=true&include_24hr_vol=true&include_24hr_change=false&include_last_updated_at=true';
let valor_nacional = brl_24h_vol = brl_market_cap = 0;

// Create our number formatter.
let formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * 
 */
function updateValue() {
    document.querySelector('#mainValue').innerHTML = formatter.format(valor_nacional);
}

function convertAdaBrl(amount) {
    return amount * valor_nacional;
}

function convertBrlAda(amount) {
    return amount / valor_nacional;
}

/**
 * 
 */
function fetchData() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            valor_nacional = Number(data.cardano.brl);
            brl_24h_vol = Number(data.cardano.brl_24h_vol);
            brl_market_cap = Number(data.cardano.brl_market_cap);
            updateValue();
        }); 
}

document
.querySelector('#nacional')
.addEventListener('click', () => {
    document.querySelector('#brlAda').checked = true;
});

document
.querySelector('#estrangeiro')
.addEventListener('click', () => {
    document.querySelector('#adaBrl').checked = true;
});

document
.querySelector('#calc-form')
.addEventListener('submit', (event) => {
    event.preventDefault();
    if (document.querySelector('#adaBrl').checked) {
        document.querySelector('#nacional').value = formatter.format(convertAdaBrl(document.querySelector('#estrangeiro').value));
    } else {
        document.querySelector('#estrangeiro').value = convertBrlAda(document.querySelector('#nacional').value);
        document.querySelector('#nacional').value = formatter.format(convertAdaBrl(document.querySelector('#estrangeiro').value));
    }
    // console.log({valor_nacional, brl_24h_vol})
})

fetchData();
window.setInterval(fetchData, 15000);
console.log('UP');