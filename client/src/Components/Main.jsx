import React, { useEffect, useState } from "react";

export default function Main({authorize}) {
  const fileInput = React.createRef();
  const [labs, setLabs] = useState([]);
  const [subject, setSubject] = useState("");
  const [task, setTask] = useState(0);
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [attach, setAttach] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/", {
      method: "get",
    })
      .then((res) => res.json())
      .then((result) => {
        setLabs(result);
      });
  });

  const addLabToDb = async () => {
    let attach = fileInput.current.files[0].name;
    let data = {
      subject: subject,
      number: task,
      status: status,
      deadline: deadline,
      attach: attach,
    };
    //console.log(data);
    await fetch("http://localhost:5000/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const deleteRow = async (e) => {
    const data = {};
    const time = e.target.getAttribute("data-id");
    data.id = time;
    console.log(data);
    await fetch("http://localhost:5000/delete", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const exit = ()=>{
    authorize(false);
  }

  return (
    <>
      <input
        className="form-control"
        type="text"
        placeholder="Search"
        id="serch-text"
        onKeyUp={() => {}}
      />
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
          {labs.map((lab) => (
            <tr data-id="" onClick={() => {}}>
              <th scope="row" name="index">
                {}
              </th>
              <td id="subjectDb">{lab.subject}</td>
              <td id="numberDb">{lab.number}</td>
              <td id="statusDb">{lab.status}</td>
              <td id="deadlineDb">{lab.deadline}</td>
              <td class="attach" id="attachDb">
                {lab.attach}
              </td>
              <td>
                <button
                  type="button"
                  id="buttonDb"
                  data-id={lab.time}
                  onClick={(event) => {
                    deleteRow(event); /*; window.location.reload();*/
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add one more lab</h3>
      <div className="form-group">
        <p>Subject</p>
        <input
          type="text"
          id="inp1"
          className="form-control"
          name="subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          style={{ marginBottom: "10px" }}
          required
        />
      </div>
      <div className="form-group">
        <p>Task number</p>
        <input
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          type="number"
          id="inp2"
          className="form-control"
          name="number"
          style={{ marginBottom: "10px" }}
          required
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select
          className="form-control"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          name="status"
          id="inp3"
          style={{ marginBottom: "10px" }}
        >
          <option value="accepted">Accepted</option>
          <option value="in progress">In progress</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="form-group">
        <p>Deadline</p>
        <input
          value={deadline}
          onChange={(e) => {
            setDeadline(e.target.value);
          }}
          type="date"
          id="inp4"
          name="deadline"
          min="2023-03-01"
          max="2026-03-01"
          class="form-control"
          style={{ marginBottom: "10px" }}
        />
      </div>
      <div className="form-group">
        <p>Attach file</p>
        <input
        
          type="file"
          id="inp5"
          className="form-control-file"
          ref={fileInput}
          name="filedata"
          style={{ marginBottom: "10px" }}
        />
      </div>
      <button className="btn btn-primary" onClick={addLabToDb}>
        Submit
      </button>
      <button className="btn btn-primary" onClick={exit}>
        Exit
      </button>
    </>
  );
}