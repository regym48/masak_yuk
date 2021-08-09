import { useEffect, useState } from "react";
import { Table, Modal, Button } from 'react-bootstrap';
import { Navigasi } from "./Navigasi";
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';

export const ListMurid = () => {
    const history = useHistory();
    const [dataListUser, setDataListUser] = useState([]);
    const [show, setShow] = useState(false);
    const [idDel, setIdDel] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        getDataUser();
    }, []);

    const handleShow = (id) => {
        setShow(true);
        setIdDel(id);
    }

    const handleClose = () => {
        setShow(false)
    }

    const getDataUser = () => {
        const token = localStorage.getItem('dataLoginUser');
        const senData = {
            token : token
        }
        fetch(`${process.env.REACT_APP_API}/listMurid`, {
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

    const handleDelete = () => {
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            id_user : idDel,
            token: token
        }
        fetch(`${process.env.REACT_APP_API}/hapusUser`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json()).then(hasil => {
            getDataUser();
            setShow(false);
            swal("success", hasil.message, "success")
        })
        .catch(err =>{
            alert(err)
        })
    }

    return (
        <>
            {/* modal hapus */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Hapus Data Murid</Modal.Title>
                </Modal.Header>
                <Modal.Body>Apakah Anda Yakin Menghapus Data?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navigasi/>
            <div className="container justify-content-center" style={{marginTop: 50}}>
                <Table responsive striped bordered>
                    <thead className="thead-dark">
                        <tr>
                            <th>No.</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Aksi</th>
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
                                        <td>
                                            <button onClick={() => handleShow(dat.id_user)} class="btn btn-danger btn-sm mr-3 mb-3" role="button">
                                                Hapus User
                                            </button>
                                        </td>
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