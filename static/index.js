const addStateBtn = document.getElementById('add-state')
const proceedBtn = document.getElementById('proceed')
const greetingInp = document.getElementById('greeting')

const states = []

addStateBtn.addEventListener('click', () => {
    const newState = new State(states.length + 1)
    states.push(newState)
})

proceedBtn.addEventListener('click', () => {
    const data = {
        greet_value: greetingInp.value.trim()
    }
    states.forEach((S) => {
        data[`S${S.Sindex}`] = S.extractData()
    })
    console.log(data)
    fetch('/data', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
    }).then(res => res.text()).then(data => {
        // console.log(data)
        window.location = '/success'
    }).catch(err => console.log(err))
})

//detect Escape key press
document.addEventListener("keydown", function(event) {
    if(event.key === 'Escape'){
       document.getElementById('form-modal').style.display = 'none'
   }
});

document.getElementById('form-modal').addEventListener("click", function(evt) {
    let    targetElement = evt.target;  // clicked element

    do {
        if (targetElement.id == 'input-form') {
            // This is a click inside. Do nothing, just return.
            // document.getElementById("flyout-debug").textContent = "Clicked inside!";
            // console.log('clicked inside!')
            return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    document.getElementById('form-modal').style.display = 'none'
});


// window.onload = () => {

// }