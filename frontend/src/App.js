import './App.css';
import FormUser from './Componentes/FormularioUsuario/formUser';
import FormOrganizacion from './Componentes/FormularioOrganizacion/formOrganizacion.jsx';
import { BarraNav } from './Componentes/BarraNav/BarraNav';



function App() {

  return (
    <div>
      <BarraNav/>
      <FormUser/>
      <FormOrganizacion/>

    </div>
  );
}

export default App;
