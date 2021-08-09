import { Table, Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

export const ListAdmin = () =>{
    const history = useHistory();
    const [dataListUser, setDataListUser] = useState([]);
    
    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        getDataUser();
    }, []);

    const getDataUser = () => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token : token
        }
        fetch(`${process.env.REACT_APP_API}/listAdmin`, {
            method: 'POST',
            body: JSON.stringify(senData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                console.log('data', hasil);
                if (hasil.status === 'berhasil') {
                    setDataListUser(hasil.data);
                } else {
                    <p>data gagal diambil</p>
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    return(
        <>
            <div className="container justify-content-center">
                <Table responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataListUser ? dataListUser.map((dat, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{dat.nama}</td>
                                        <td>{dat.email}</td>
                                        <td>{dat.role}</td>
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