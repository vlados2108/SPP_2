import React from "react"
import Table from "./table"
export default class FormAdd extends React.Component {
    constructor(props) {
        super(props);
        this.addLabToDb = this.addLabToDb.bind(this);
        this.fileInput = React.createRef();
        this.state = {
            labs: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/")
            //.then(res=> console.log(res.json()))
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        labs: result
                    })
                }
            )
    }


    deleteDataInChild = async (e) => {
        const data = {};
        const time = e.target.getAttribute('data-id');
        data.id = time;
        console.log(data);
        await fetch("http://localhost:5000/delete", {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        await fetch("http://localhost:5000/", {
            method: 'get',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        labs: result
                    })
                    this.setState({
                        labs: result
                    })
                }
            )
    }



    async addLabToDb() {
        let subject = document.getElementById("inp1").value;
        let number = document.getElementById("inp2").value;
        let status = document.getElementById("inp3").value;
        let deadline = document.getElementById("inp4").value;
        let attach = this.fileInput.current.files[0].name;//document.getElementById("inp5").value;
        let data = { subject: subject, number: number, status: status, deadline: deadline, attach: attach };
        //console.log(data);
        await fetch("http://localhost:5000/add", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        await fetch("http://localhost:5000/", {
            method: 'get',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        labs: result
                    })
                }
            )
    }

    render() {
        const lab = this.state.labs;
        return (
            <>
                <Table labs={lab} deleteDataInChild={this.deleteDataInChild} />
                <h3>Add one more lab</h3>
                <div className="form-group">
                    <p>Subject</p>
                    <input type="text" id="inp1" className="form-control" name="subject" style={{ marginBottom: "10px" }} required />
                </div>
                <div className="form-group">
                    <p>Task number</p>
                    <input type="number" id="inp2" className="form-control" name="number" style={{ marginBottom: "10px" }} required />
                </div>
                <div className="form-group">
                    <p>Status</p>
                    <select className="form-control" name="status" id="inp3" style={{ marginBottom: "10px" }}>
                        <option value="accepted">Accepted</option>
                        <option value="in progress">In progress</option>
                        <option value="done">Done</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="form-group">
                    <p>Deadline</p>
                    <input type="date" id="inp4" name="deadline" min="2023-03-01" max="2026-03-01" class="form-control" style={{ marginBottom: "10px" }} />
                </div>
                <div className="form-group">
                    <p>Attach file</p>
                    <input type="file" id="inp5" className="form-control-file" ref={this.fileInput} name="filedata" style={{ marginBottom: "10px" }} />
                </div>
                <button className="btn btn-primary" onClick={this.addLabToDb}>Submit</button>
            </>
        )
    }
}