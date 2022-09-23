import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class AddEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailId: ''
        }


        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        // this.cancel= this.cancel.bind(this);
    }

    // changeFirstNameHandler(event) {
    //     this.setState({ firstName: event.target.value });
    // }
    saveEmployee = (event) => {
        event.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.emailId };
        console.log("employee => " + JSON.stringify(employee));
        EmployeeService.addEmployee(employee).then(res => {
            window.location.href="/employees";
        });

    }
    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
        // console.log(this.state.firstName);
    }
    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }
    cancel(event) {
        event.preventDefault();
        window.location.href = '/employees';
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3>Add Employees</h3>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>First Name</label>
                                        <input placeholder='First Name' name='firstName' className='form-control'
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                        <label>Second Name</label>
                                        <input placeholder='Last Name' name='lastName' className='form-control'
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                        <label>Email Id</label>
                                        <input placeholder='Email Id' name='emailId' className='form-control'
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default AddEmployeeComponent;