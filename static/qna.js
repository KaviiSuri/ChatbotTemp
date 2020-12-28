questions = []
questionDiv = document.getElementById('questions')
class Question {
    constructor(Qindex) {
        this.Qindex = Qindex
        this.id = `Q${this.Qindex}`
        this.data = {
            answer: "",
            keywords: ""
        }
    }
    render() {
        const transBtn = document.createElement('button')
        transBtn.innerHTML = `Question ${this.Qindex}`
        transBtn.id = this.id
        transBtn.classList.add('trans')
        transBtn.addEventListener('click', this.onClick)
        return transBtn
    }

    serializeForm  (form) {
        var obj = {};
        var formData = new FormData(form);
        for (var key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    };
    onClick = () => {
        // Reset all the event listeners on the form and add one new one
        const inpForm = document.getElementById('input-form')
        const newForm = inpForm.cloneNode(true)
        // add event listener for on submit
        // newForm.style.display = 'block'
        document.getElementById('form-modal').style.display = 'block'
        newForm.querySelector('h2').innerText = `Question ${this.Qindex}`
        newForm.addEventListener('submit', this.onFormSubmit)
        inpForm.parentNode.replaceChild(newForm, inpForm)
        // load values from this to the form
        Object.keys(this.data).forEach(key =>  {
                document.getElementById(key).value = this.data[key]
        })
    }
    onFormSubmit = (e) => {
        e.preventDefault()

        // on submit, load values from form to this
        const formData = this.serializeForm(e.target)
        // e.target.elements.namedItem('end').checked ? formData.end = true : formData.end = false;
        // console.log(formData)
        Object.keys(this.data).forEach(key =>  {
            this.data[key] = formData[key]
        })
        document.getElementById('form-modal').style.display = 'none'
        // e.target.style.display = 'none'
    }
    extractData () {
        const data =  JSON.parse(JSON.stringify(this.data));
        data.keywords = data.keywords.split(',').map(keyword =>  keyword.trim())
        return data
    }
}


// Handle Adding Questions
document.getElementsByClassName('add-trans-btn')[0].addEventListener('click', () => {
    const newTrans = new Question(questions.length + 1)
    questions.push(newTrans)
    questionDiv.appendChild(newTrans.render())   
})

// Handle Form Closing
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
keys = ['abuse', 'repeat', 'spare']


// on submit
document.getElementById('proceed').addEventListener("click", () => {
    const data = {}
    keys.forEach(key => {
        let keywords = document.getElementById(`${key}-keywords`).value.split(',').map(keyword =>  keyword.trim())
        data[key] = {
            statement: document.getElementById(`${key}-statement`).value,
            keywords: keywords
        }
    })
    data['questions'] = {local: {}}
    questions.forEach((q, i) => {
        data.questions.local[i + 1] = q.extractData()
    })
    
    console.log(data)
    fetch('/qna', {
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