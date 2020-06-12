import { EditarPerfilComponent } from './components/user-profile/editar-perfil/editar-perfil.component';
import { PerfilComponent } from './components/user-profile/editar-perfil/perfil/perfil.component';
import { MiPlanDetComponent } from './components/user-profile/editar-perfil/miplandet/miplandet.component';
import { MisComprasComponent } from './components/user-profile/editar-perfil/mis-compras/mis-compras.component';
import { MisDireccionesComponent } from './components/user-profile/editar-perfil/misdirecciones/misdirecciones.component';

export const EditarPerfilRoutes = [
{
  path: 'editar-perfil',
  component: EditarPerfilComponent,
   children: [
     {
       path: '',
       redirectTo: 'perfil',
      pathMatch: 'full'
    },
    {
      path: 'perfil',
      component: PerfilComponent,
  },
  {
    path: 'miplandet',
    component: MiPlanDetComponent
},
{
  path: 'miscompras',
  component: MisComprasComponent
},
{
  path: 'misdirecciones',
  component: MisDireccionesComponent
}
 ]
},
];
