import { useEffect, useState } from "react";
import axios from 'axios';

function Student() {
    const [id, setId] = useState('');
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [fee, setFee] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        try {
            const result = await axios.get("http://127.0.0.1:8000/student");
            setStudents(result.data);
        } catch (err) {
            console.error("Failed to load students:", err);
        }
    }

    async function save(event) {
        event.preventDefault();
        if (!name.trim() || !address.trim() || !fee.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const existingStudent = students.find(u => u.name.toLowerCase() === name.toLowerCase());
            if (existingStudent) {
                alert("Student with this name already exists. Please choose a different name.");
                return;
            }
            await axios.post("http://127.0.0.1:8000/student", {
                name: name,
                address: address,
                fee: fee
            });
            alert("Student Registration Successful");
            clearForm();
            Load();
        } catch (err) {
            alert("Student Registration Failed");
        }
    }

    async function editStudent(student) {
        setName(student.name);
        setAddress(student.address);
        setFee(student.fee);
        setId(student.id);
    }

    async function DeleteStudent(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/student/${id}`);
                alert("Student deleted Successfully...");
                clearForm();
                Load();
            } catch (err) {
                alert("Failed to delete student.");
            }
        }
    }

    async function update(event) {
        event.preventDefault();
        if (!id || !name.trim() || !address.trim() || !fee.trim()) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            await axios.put(`http://127.0.0.1:8000/student/${id}`, {
                id: id,
                name: name,
                address: address,
                fee: fee
            });
            alert("Student Updated...");
            clearForm();
            Load();
        } catch (err) {
            alert("Student Update Failed...");
        }
    }

    const handleNameChange = (event) => {
        const newValue = event.target.value;
        if (/^[a-zA-Z\s]*$/.test(newValue)) {
            setName(newValue);
        }
    };

    const clearForm = () => {
        setId("");
        setName("");
        setAddress("");
        setFee("");
    };

    return (
        <div className="app" style={{ width: "1000px", border: "1px solid black", borderRadius: "10px" }}>
            <h1>Customer Details</h1>
            <div className="container mt-4">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Customer Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            pattern="[A-Za-z\s]+"
                            title="Please Enter Text Only"
                            value={name}
                            onChange={handleNameChange}
                            required
                        />
                    </div><br />

                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div><br />

                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="fee"
                            value={fee}
                            onChange={(event) => setFee(event.target.value)}
                        />
                    </div>

                    <div>
                        <button className="btn btn-primary mt-4" style={{ marginRight: "15px" }} onClick={save}>Register</button>
                        <button className="btn btn-warning mt-4" onClick={update}>Update</button>
                    </div>
                </form>
            </div><br /><br />

            <table className="table table-dark" align="center" style={{ borderRadius: "20px", border: "1px solid #fff" }}>
                <thead>
                    <tr>
                        <th scope="col">Customer Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <th scope="row">{student.id}</th>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.fee}</td>
                            <td>
                                <button type="button" className="btn btn-warning" style={{ marginRight: "15px" }} onClick={() => editStudent(student)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(student.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Student;
