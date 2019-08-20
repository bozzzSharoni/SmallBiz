import React, { Component } from 'react';

class OpenBisnnes extends Component {
    constructor() {
        super()
        this.state = {
            newBusines: {},
            stringInput: ["name", "email", "password", "description", "img", "owner", "payment", "country", "city", "address", "field", "service",],
            numbersInput: ["price", "averageAppointmentTime", "rating", "startTimeTillBrake", "brakeStartTime", "breakEndTime", "endTime"]
        }

    }
    updeBesniiesText = (e) => {
        let name = e.target.name
        let text = e.target.value
        // this.state[name] = 0
        let newBusines = { ...this.state.newBusines }
        newBusines[name] = text
        this.setState({
            newBusines: newBusines
        }, function () {
            // console.log(this.state,this.state.userToUpdate)
        })
    }

    createNewBussnies = () => {
        let length = this.state.stringInput.length + this.state.numbersInput.length

        if (Object.keys(this.state.newBusines).length === length) {
            let allFieldAreFull = true
            for (let i in this.state.newBusines) {
                console.log(this.state.newBusines[i])
                if (this.state.newBusines[i] === "") {
                    allFieldAreFull = false
                }
            }
            allFieldAreFull === true ? this.clearInputs() : alert("not all fields are proparly filled")
        } else { alert("sorry all field must be valid") }
        // ojj = {}
    }
    clearInputs = () => {
        alert("work and need to open new busnies")
        this.state.newBusines = {}
    }

    render() {
        let stringInput = this.state.stringInput
        let numbersInput = this.state.numbersInput
        return <div>Helle this is where you are gonna put your besniess data and wait for us to confferm your request
              <h5> Add New Besniess </h5>

            {stringInput.map(i => <label>{i} <input name={`${i}`} type="text" value={this.state.newBusines[i]} onChange={this.updeBesniiesText} placeholder={`${i}`} /> </label>)}
            <h5>numbers</h5>
            {numbersInput.map(i => <label>{i} <input name={`${i}`} type="number" value={this.state.newBusines[i]} onChange={this.updeBesniiesText} placeholder={`${i}`} /> </label>)}

            <button onClick={this.createNewBussnies}>Add New User <i class="material-icons right">send</i> </button> </div>
    }
}

export default OpenBisnnes;
