import { useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { Container, Card, Form, Button } from "react-bootstrap";
import logo from "./logo-masak.png"

export const RegistrasiAdmin = () => {
    const history = useHistory();
    const [nama, setNama] = useState('');
    console.log(nama);
    const [email, setEmail] = useState('');
    console.log(email);
    // const [password, setPassword] = useState('');
    // console.log(password);
    // const [confirmPassword, setConfirmPassword] = useState('');
    // console.log(confirmPassword);
    const [role] = useState('admin');
    console.log(role);

    // useEffect(() => {
    //     const login = localStorage.getItem('dataLoginUser');
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataSend = {
            nama,
            email,
            // password,
            // password_confirmation: confirmPassword,
            role
        }
        if (nama === '' || email === '') {
            swal("Failed", "Registrasi Gagal, Semua Data Harus Diisi!", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/registrasi`, {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json()).then(hasil => {
                    console.log(hasil);
                    if (hasil.status === 'berhasil') {
                        swal("success", 'Anda Berhasil Registrasi, Silahkan Periksa Email Anda', "success")
                        history.push('/');
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    const handleBack = () =>{
        history.push('/');
    }

    return (
        <>
            <div className="text-center mb-10">
                <img
                    alt=""
                    src={logo}
                    width="400"
                    height="250"

                />
            </div>
            <Container className="justify-content-center">
                <Card>
                    <Card.Header>
                        <h4>Registrasi Admin</h4>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <input value={role} type="hidden" className="form-control"></input>
                                <Form.Label>Nama Anda</Form.Label>
                                <input onChange={(e) => setNama(e.target.value)} type="text" className="form-control" placeholder="Nama"></input>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email Anda</Form.Label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email"></input>
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password Anda</Form.Label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"></input>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ulangi Password Anda</Form.Label>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" placeholder="Konfirmasi Password"></input>
                                {password !== confirmPassword && (password.length > 0 || confirmPassword.length > 0) ? <span style={{ color: 'red', fontsize: 20 }}>Password dan Konfirmasi Password Tidak Sesuai</span> : ''}
                            </Form.Group> */}
                            <Button onClick={(e) => handleSubmit(e)} className="mr-3" variant="primary" type="submit">
                                Daftar
                            </Button>
                            <Button onClick={() => handleBack()} variant="danger" type="submit">
                                Kembali
                            </Button>
                            {/* {
                                password !== confirmPassword && (password.length > 0 || confirmPassword.length > 0) ?
                                    <>
                                        <Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit" disabled>
                                            Daftar
                                        </Button>
                                    </> :
                                    <>
                                        <Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
                                            Daftar
                                        </Button>
                                    </>
                            } */}
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}