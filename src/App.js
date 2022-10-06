import React from 'react';
import { BrowserRouter as Router, Switch, Route,  Redirect } from 'react-router-dom';
import { Header } from './components/iud/Header';
import { EstadoView } from './components/estados/EstadoView';
import { InventarioView } from './components/inventarios/InventarioView';
import { MarcaView } from './components/marcas/MarcaView';
import { Tipoview } from './components/tipos/Tipoview';
import { Usuarioview } from './components/usuarios/Usuarioview';
import { InventarioUpdate } from './components/inventarios/InventarioUpdate';

const App = () => {
    return <Router>
        <Header />
        <Switch>
            <Route exact path='/' component={ InventarioView }/>
            <Route exact path='/usuarios' component={ Usuarioview }/>
            <Route exact path='/marcas' component={ MarcaView }/>
            <Route exact path='/estados' component={ EstadoView }/>
            <Route exact path='/tipos' component={ Tipoview }/>
            <Route exact path='inventarios/edit:id/:inventarioId' component={InventarioUpdate} />
            <Redirect to='/' />
        </Switch> 
    </Router>
}

export {
    App
}