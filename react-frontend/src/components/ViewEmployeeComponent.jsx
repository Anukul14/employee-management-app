import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: window.location.href.split('/')[4],
            firstName: '',
            lastName: '',
            emailId: ''
        }

        this.updateEmployee= this.updateEmployee.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id);
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            let employee = res.data;
            console.log("employee => " + JSON.stringify(employee));
            this.setState({ firstName: employee.firstName, lastName: employee.lastName, emailId: employee.email });
        });
    }

    updateEmployee(){
        window.location.href="/update-employee/"+this.state.id;
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3>View Employee </h3>
                            <div className='card-body'>
                                <span><b>Name: </b></span> <text>{this.state.firstName +' '+ this.state.lastName} </text>
                                <br></br>
                                <span><b>Email: </b></span> <text>{this.state.emailId} </text>
                                <button className='btn btn-info' onClick={this.updateEmployee}>Update</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
            ;
    }
}

export default ViewEmployeeComponent;