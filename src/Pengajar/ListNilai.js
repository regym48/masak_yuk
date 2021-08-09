import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';
import logo from "./logo-masak.png"
import { Navigasi } from "./Navigasi";
import swal from "sweetalert";

export const ListNilai = () => {
    const history = useHistory();
    const [dataListCourse, setDataListCourse] = useState([]);
    const [dataListNilai, setDataListNilai] = useState([]);
    const [idCou, setIdCou] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
            return;
        }
        getDataCourse();
        getDataNilai();
    }, []);

    const getDataCourse = () => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/listCourse`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListCourse(hasil.data);
                } else {
                    swal("failed", hasil.message, "error")
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    const getDataNilai = (e) => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token: token,
            id_course: idCou
        }
        fetch(`${process.env.REACT_APP_API}/listNilai`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListNilai(hasil.data);
                } else {
                    swal("failed", hasil.message, "error")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <Navigasi />
            <div className="container justify-content-center" style={{ marginTop: 50 }}>
                <Form.Select className="mb-3" onChange={(e) => setIdCou(e.target.value)} aria-label="Default select example">
                    <option selected value="1">--Pilih Course--</option>
                    {
                        dataListCourse ? dataListCourse.map((dat, index) => {
                            return (
                                <option key={index} value={dat.id_course}>{dat.nama_course}</option>
                            )
                        }) : ''
                    }
                </Form.Select>
                <button onClick={(e) => getDataNilai(e)} class="btn btn-primary btn-md ml-3" role="button">
                    Cari
                </button>
                <Table responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Course</th>
                            <th>Nama</th>
                            <th>Nilai</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataListNilai ? dataListNilai.map((dat, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{dat.nama_course}</td>
                                        <td>{dat.nama}</td>
                                        <td>{dat.nilai}</td>
                                    </tr>
                                )
                            }) : ''
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}