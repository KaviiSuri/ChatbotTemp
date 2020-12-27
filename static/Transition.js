class Transition {
    constructor(Sindex, Tindex) {
        this.Sindex = Sindex
        this.Tindex = Tindex
        this.id = `S${this.Sindex}-T${this.Tindex}`
        this.data = {
            message: "",
            keywords: "",
            end: '',
            spareContent: '',
            intent: '',
            transitionState: '',
            type: '',
        }
    }
    render() {
        const transBtn = document.createElement('button')
        transBtn.innerHTML = `Transition ${this.Tindex}`
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
        newForm.querySelector('h2').innerText = `State ${this.Sindex} - Transition ${this.Tindex}`
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