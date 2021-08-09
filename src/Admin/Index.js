import { useEffect, useState } from "react";
import { TambahAdmin } from "./TambahAdmin";
import { Navigasi } from "./Navigasi";
import { ListAdmin } from "./ListAdmin";
import { useHistory } from 'react-router-dom';

export const HalamanAdmin = () => {
    const history = useHistory();
    const [namaUser, setNamaUser] = useState('');

    useEffect(() => {
        const login = localStorage.getItem('dataLoginUser');
        if(!login){
            history.push('/');
            return;
        }
        const name = localStorage.getItem('dataNamaUser');
        setNamaUser(name);
    }, []);

    return (
        <>
            <Navigasi/>
            <div class="jumbotron">
                <h1 class="display-4">Selamat Datang {namaUser}</h1>
                <TambahAdmin />
            </div>
            <ListAdmin/>
        </>
    )
}