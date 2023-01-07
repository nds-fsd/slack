import './App.css';
import FormUser from './Componentes/FormularioUsuario/formUser';
import FormOrganizacion from './Componentes/FormularioOrganizacion/formOrganizacion.jsx';
import DashboardUser from './Componentes/DashboardUsuario/dashboardUser';



function App() {

  return (
    <div>
      <DashboardUser/>
      <FormUser/>
      <FormOrganizacion/>

    </div>
  );
}

export default App;
