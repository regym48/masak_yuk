import { Navbar, Container, Row, Col, Card, Form, Button, Modal } from "react-bootstrap";
import "./Style.css"
import icon from "./icon-masak.png";
import logo from "./chef.jpg";
import gmbr from "./logo-masak.png";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailLupa, setEmailLupa] = useState('');
    console.log(emailLupa);
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('dataRole');

        if (role === 'admin') {
            history.push('/halaman-admin');
        } else if (role === 'pengajar') {
            history.push('/halaman-pengajar');
        } else if (role === 'murid') {
            history.push('/halaman-murid');
        }
    }, []);

    const handleShow = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataSend = {
            email,
            password
        }
        if (email === '' || password === '') {
            swal("Failed", "Login Gagal", "error")
        } else {
            fetch(`${process.env.REACT_APP_API}/login`, {
                method: 'POST',
                body: JSON.stringify(dataSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json()).then(hasil => {
                    console.log(hasil);
                    if (hasil.status === 'berhasil') {
                        localStorage.setItem('dataLoginUser', hasil.token);
                        localStorage.setItem('dataNamaUser', hasil.nama);
                        localStorage.setItem('dataIdUser', hasil.id_user);
                        localStorage.setItem('dataRole', hasil.role);
                        const jabatan = localStorage.getItem('dataRole');
                        if (jabatan === 'admin') {
                            history.push('/halaman-admin');
                        } else if (jabatan === 'pengajar') {
                            history.push('/halaman-pengajar');
                        } else if (jabatan === 'murid') {
                            history.push('/halaman-murid');
                        }
                    } else {
                        swal("Failed", hasil.message, "error")
                    }
                })
                .catch(err => {
                    alert(err)
                })
        }
    }

    const handleLupa = () => {
        const dataSend = {
            email: emailLupa
        }
        fetch(`${process.env.REACT_APP_API}/lupaPassword`, {
            method: 'POST',
            body: JSON.stringify(dataSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json()).then(hasil => {
                swal("success", "silahkan periksa email anda", "success")
                handleClose();
            })
            .catch(err => {
                swal("success", "silahkan periksa email anda", "success")
                handleClose();
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Lupas Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="emailLupa">Email Anda</label>
                        <input onChange={(e) => setEmailLupa(e.target.value)} value={emailLupa} type="email" className="form-control" id="emailLupa"></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLupa}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Navbar bg="kuning" variant="light">
                <Container>
                    <Navbar.Brand href="/registrasi-admin">
                        <img
                            alt=""
                            src={icon}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Masak Yuk!
                    </Navbar.Brand>
                    <Navbar.Brand href="/registrasi-pengajar">
                        <img
                            alt=""
                            src={gmbr}
                            width="70"
                            height="60"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <Container className="pt-5">
                <Row className="justify-content-center">
                    <Col>
                        <h3>Selamat datang di Website Masak Yuk!</h3>
                        <img
                            alt=""
                            src={logo}
                            width="500"
                            height="500"
                        />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h4>Login</h4>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email Anda</Form.Label>
                                        <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Email"></input>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password Anda</Form.Label>
                                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"></input>
                                    </Form.Group>
                                    <Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
                                        Masuk
                                    </Button>
                                </Form>
                            </Card.Body>
                            <Card.Header>
                                <a>Belum Memiliki Akun? Silahkan Daftar </a>
                                <span>
                                    <a href="/registrasi-murid">Disini!</a>
                                </span>
                                <p></p>
                                <Button onClick={() => handleShow()} variant="warning" type="button">
                                    Lupa Password
                                </Button>
                            </Card.Header>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}