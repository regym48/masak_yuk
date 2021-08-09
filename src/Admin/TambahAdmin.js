import { useEffect, useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';

export const TambahAdmin = () => {
    const [lgShow, setLgShow] = useState(false);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('admin');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginUser');
        const dataSend = {
            token : token,
            nama : nama,
            email : email,
            password : password,
            role : role
        }
        if (nama === '' || email === '' || password === '') {
            swal("Failed", "Registrasi Gagal, Semua Data Harus Diisi!", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/tambahUser`, {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json()).then(hasil => {
                    console.log(hasil);
                    if (hasil.status === 'berhasil') {
                        swal("success", hasil.message, "success")
                        setLgShow(false);
                    }else {
                        swal("failed", hasil.message, "error")
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    return (
        <>
            {/* modal tambah admin */}
            <Modal
                size="lg"
                show={lgShow}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Tambah Admin
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="judul">Nama</label>
                            <input onChange={(e) => setNama(e.target.value)} value={nama} type="text" className="form-control" id="nama" placeholder="Nama Admin"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className="form-control" id="email" placeholder="Email Admin"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="link_thumbnail">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-control" id="password" placeholder="Password Admin"></input>
                        </div>
                        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">Simpan</button>
                        <button onClick={() => setLgShow(false)} className="btn btn-warning ml-3">Batal</button>
                    </form>
                </Modal.Body>
            </Modal>

            <button onClick={() => setLgShow(true)} class="btn btn-primary btn-lg mr-3 mt-3" role="button">
                Tambah Admin
            </button>
        </>
    )
}