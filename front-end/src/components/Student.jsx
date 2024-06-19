import { useEffect, useState } from "react";
import axios from 'axios';
// import './App.css'
function Student() {

    const [id, setId] = useState('');
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [fee, setFee] = useState("");
    const [students, setUsers] = useState([]);


    useEffect(() => {
        (async () => await Load())();
    }, []);


    async function Load() {
        const result = await axios.get(
            "http://127.0.0.1:8000/student");
        setUsers(result.data);
        console.log(result.data);
    }


    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/student",
                {

                    name: name,
                    address: address,
                    fee: fee

                });
            alert("Student Registation Successfully");
            setId("");
            setName("");
            setAddress("");
            setFee("");
            Load();



        }
        catch (err) {
            alert("Student Registation Failed");
        }
    }



    async function editStudent(students) {
        setName(students.name);
        setAddress(students.address);
        setFee(students.fee);
        setId(students.id);

    }
    async function DeleteStudent(id) {

        await axios.delete("http://127.0.0.1:8000/student/" + id);
        alert("Student deleted Successfully...");
        setId("");
        setName("");
        setAddress("");
        setFee("");
        Load();


    }
    async function update(event) {
        event.preventDefault();
        try {

            await axios.put("http://127.0.0.1:8000/student/" + students.find(u => u.id === id).id || id,
                {
                    id: id,
                    name: name,
                    address: address,
                    fee: fee

                });
            alert("Student Updated...");
            setId("");
            setName("");
            setAddress("");
            setFee("");
            Load();

        }
        catch (err) {
            alert(" Student updated Failed...");
        }
    }
    return (
        <div className="app" style={{width:"1000px", border:"1px solid black",borderRadius:"10px",}}>
            <h1>Customer Details</h1>
            <div class="container mt-4" >
                <form>
                    <div class="form-group">

                        <label>Customer Name</label>
                        <input type="text" class="form-control" id="name"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div><br />

                    <div class="form-group">
                        <label>Address</label>
                        <input type="text" class="form-control" id="address"
                            value={address}
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}
                        />
                    </div><br />
                    <div class="form-group" >
                        <label>Amount</label>
                        <input type="text" class="form-control" id="fee"
                            value={fee}
                            onChange={(event) => {
                                setFee(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button class="btn btn-primary mt-4" style={{marginRight:"15px"}} onClick={save}>Register</button>
                        <button class="btn btn-warning mt-4" onClick={update}>Update</button>
                    </div>


                </form>
            </div><br /><br />


            <table className="table table-dark" align="center" style={{borderRadius:"20px", border:"1px solid #fff",}}>
                <thead>
                    <tr>
                        <th scope="col">Customer Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Amount</th>

                        <th scope="col">Option</th>
                    </tr>
                </thead>
                {students.map(function fn(student) {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{student.id} </th>
                                <td>{student.name}</td>
                                <td>{student.address}</td>
                                <td>{student.fee}</td>
                                <td>
                                    <button type="button" style={{marginRight:"15px"}} class="btn btn-warning" onClick={() => editStudent(student)} >Edit</button>
                                    <button type="button" class="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
}
export default Student;