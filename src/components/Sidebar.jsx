import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom'


export const Sidebar = ({ role }) => {
  const { logout } = useAuth()
  const location = useLocation()

  const menu = [
    { path: '/dashboard', label: 'Inicio', icon: '/src/assets/home.png' },
    { path: '/dashboard/appointments', label: 'Citas', icon: '/src/assets/calendar.png' },
    { path: '/dashboard/prescriptions', label: 'Recetas', icon: '/src/assets/pill.png' },
    { path: '/dashboard/history', label: 'Historial', icon: '/src/assets/history.png' },
    { path: '/dashboard/notifications', label: 'Notificaciones', icon: '/src/assets/bell.png' }
  ]

  const adminMenu = [
    { path: '/dashboard/users', label: 'Usuarios', icon: '/src/assets/users.png' },
    { path: '/dashboard/patients', label: 'Pacientes', icon: '/src/assets/patient.png' },
    { path: '/dashboard/pharmacy', label: 'Farmacia', icon: '/src/assets/pharmacy.png' },
    { path: '/dashboard/reports', label: 'Reportes', icon: '/src/assets/report.png' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="sidebar">
      <ul className="sidebar__menu">
        {[...menu, ...(role === 'ADMIN' ? adminMenu : [])].map((item) => (
          <li key={item.path}>
            <Link to={item.path} className={isActive(item.path) ? 'active' : ''}>
              <img src={item.icon} alt={`${item.label} icon`} />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar__bottom">
        <button onClick={logout}>
          <img src="/src/assets/logout.png" alt="logout icon" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
