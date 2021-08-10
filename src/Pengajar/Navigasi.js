import { Navbar, Container, NavDropdown, Modal, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import icon from "../icon-masak.png";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const Navigasi = () => {
    const history = useHistory();
    const [namaUser, setNamaUser] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('dataNamaUser');
        const login = localStorage.getItem('dataLoginUser');
        if (!login) {
            history.push('/');
            return;
        }
        setNamaUser(name);
    }, []);

    const LogOut = () => {
        localStorage.removeItem('dataLoginUser');
        localStorage.removeItem('dataNamaUser');
        localStorage.removeItem('dataRole');
        localStorage.removeItem('dataIdUser');
        localStorage.removeItem('dataIdCourse');
        localStorage.removeItem('dataIndexVideo');
        history.push('/');
    }

    const handleUbah = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('dataLoginUser');
        const id_pengguna = localStorage.getItem('dataIdUser');
        const dataSend = {
            token: token,
            id_user: id_pengguna,
            password: password,
            password_confirmation: confirmPassword
        }
        if (password === '' || confirmPassword === '') {
            swal("Failed", "Ubah Password Gagal, Semua Data Harus Diisi!", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/ubahPassword`, {
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
                        LogOut();
                    } else {
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
            {/* modal ubah pw */}
            <Modal
                size="lg"
                show={showEdit}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Ubah Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="judul">Password Baru</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password Baru"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Ulangi Password Baru</label>
                            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="Konfirmasi Password Baru"></input>
                            {password !== confirmPassword && (password.length > 0 || confirmPassword.length > 0) ? <span style={{ color: 'red', fontsize: 20 }}>Password dan Konfirmasi Password Tidak Sesuai</span> : ''}
                        </div>
                        {
                            password !== confirmPassword && (password.length > 0 || confirmPassword.length > 0) ?
                                <>
                                    <button className="btn btn-primary mr-3" disabled>Simpan</button>
                                </> :
                                <>
                                    <button onClick={(e) => handleUbah(e)} className="btn btn-primary mr-3">Simpan</button>
                                </>
                        }
                        <button onClick={() => setShowEdit(false)} className="btn btn-warning">Batal</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Navbar bg="kuning" variant="light" sticky="top">
                <Container>
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={icon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Masak Yuk!
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/halaman-pengajar">Course</Nav.Link>
                        <Nav.Link href="/list-video-pengajar">Video</Nav.Link>
                        <Nav.Link href="/soal-pengajar">Soal</Nav.Link>
                        <Nav.Link href="/list-nilai">Nilai</Nav.Link>
                    </Nav>
                    <NavDropdown title={namaUser} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => LogOut()}>Logout</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setShowEdit(true)}>Ubah Password</NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Navbar>
        </>
    )
}