//import { useEffect } from "react"
import React from "react"

export default class table extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            labs: this.props.labs
        })
    }

    render() {
        let i = 1;
        return (
            <>
                <input className="form-control" type='text' placeholder="Search" id="serch-text" onKeyUp={() => { }} />
                <table className="table" id="labs-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Subject</th>
                            <th scope="col">Number</th>
                            <th scope="col">Status</th>
                            <th scope="col">Deadline</th>
                            <th scope="col">Attach</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.labs.map(lab => (
                            <tr data-id="" onClick={() => { }}>
                                <th scope="row" name="index">{i++}</th>
                                <td id="subjectDb">{lab.subject}</td>
                                <td id="numberDb">{lab.number}</td>
                                <td id="statusDb">{lab.status}</td>
                                <td id="deadlineDb">{lab.deadline}</td>
                                <td class="attach" id="attachDb">{lab.attach}</td>
                                <td>
                                    <button type="button" id="buttonDb" data-id={lab.time} onClick={() => { }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        )
        //}
    }

}
