
function Table(){
    return(
        <>
            <input className="form-control" type='text' placeholder="Search" id="serch-text" onKeyUp={()=>{}}/>
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
                    <tr data-id="" onClick={()=>{}}>    
                        <th scope="row" name="index"></th>
                        <td id="subjectDb"></td>
                        <td id="numberDb"> </td>
                        <td id="statusDb"></td>
                        <td id="deadlineDb"></td>
                        <td class="attach" id="attachDb"></td>
                        <td>
                            <button type="button" id="buttonDb" data-id="<%=labs[i].time%>" onclick="deleteRow(this)">Delete</button>              
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </>
       
    )
}

export default Table