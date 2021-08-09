import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import { Login } from "./Login";
import { HalamanAdmin } from "./Admin/Index";
import { HalamanPengajar } from "./Pengajar/Index";
import { HalamanMurid } from "./Murid/Index";
import { RegistrasiMurid } from "./Murid/RegistrasiMurid";
import { RegistrasiAdmin } from "./Admin/RegistrasiAdmin";
import { RegistrasiPengajar } from "./Pengajar/RegistrasiPengajar";
import { ListPengajar } from "./Admin/ListPengajar";
import { ListMurid } from "./Admin/ListMurid";
import { ListVideo } from "./Murid/ListVideo";
import { SoalKuis } from "./Murid/SoalKuis";
import { Skor } from "./Murid/Skor";
import { ListVideoPengajar } from "./Pengajar/ListVideo";
import { ListSoalPengajar } from "./Pengajar/ListSoal";
import { ListNilai } from "./Pengajar/ListNilai";

const Middleware = () =>{
    return(
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Login/>} />
                <Route exact path="/halaman-admin" render={() => <HalamanAdmin/>} />
                <Route exact path="/halaman-pengajar" render={() => <HalamanPengajar/>} />
                <Route exact path="/halaman-murid" render={() => <HalamanMurid/>} />
                <Route exact path="/registrasi-murid" render={() => <RegistrasiMurid/>} />
                <Route exact path="/registrasi-admin" render={() => <RegistrasiAdmin/>} />
                <Route exact path="/registrasi-pengajar" render={() => <RegistrasiPengajar/>} />
                <Route exact path="/list-pengajar" render={() => <ListPengajar/>} />
                <Route exact path="/list-murid" render={() => <ListMurid/>} />
                <Route exact path="/list-video" render={() => <ListVideo/>} />
                <Route exact path="/soal-kuis" render={() => <SoalKuis/>} />
                <Route exact path="/skor" render={() => <Skor/>} />
                <Route exact path="/list-video-pengajar" render={() => <ListVideoPengajar/>} />
                <Route exact path="/soal-pengajar" render={() => <ListSoalPengajar/>} />
                <Route exact path="/list-nilai" render={() => <ListNilai/>} />
            </Switch>
        </Router>
    )
}
export default Middleware;