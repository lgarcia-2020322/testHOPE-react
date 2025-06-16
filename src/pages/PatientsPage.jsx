import { useState } from 'react'
import { usePatients } from '../shared/hooks/usePatients'
import { PatientCard } from '../components/PatientCard'
import { PatientForm } from '../components/PatientForm'

export const PatientsPage = () => {
  const {
    patients,
    searchPatients,
    filterPatients,
    deletePatient
  } = usePatients()

  const [searchValue, setSearchValue] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [selectedPatientId, setSelectedPatientId] = useState(null)

  const handleSearch = async () => {
    if (!searchValue.trim()) return
    await searchPatients(searchValue.trim())
  }

  const handleFilter = async () => {
    if (!filterType || !filterValue.trim()) return
    await filterPatients(filterType, filterValue.trim())
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este paciente?')
    if (confirm) await deletePatient(id)
  }

  return (
    <div className="dashboard-main">
      <h2>Gestión de Pacientes</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o apellido"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filtrar por...</option>
          <option value="bloodType">Tipo de sangre</option>
          <option value="disease">Enfermedad crónica</option>
          <option value="allergy">Alergia</option>
          <option value="gender">Género</option>
        </select>

        <input
          type="text"
          placeholder="Valor"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>

      {patients.length === 0 ? (
        <p>No hay pacientes disponibles</p>
      ) : (
        patients.map((p) => (
          <PatientCard
            key={p._id}
            patient={p}
            onView={() => console.log('Ver historial', p._id)}
            onEdit={() => setSelectedPatientId(p._id)}
            onDelete={() => handleDelete(p._id)}
          />
        ))
      )}

      {selectedPatientId && (
        <div className="modal-overlay" onClick={() => setSelectedPatientId(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <PatientForm
              patientId={selectedPatientId}
              onSuccess={() => setSelectedPatientId(null)}
            />
            <button onClick={() => setSelectedPatientId(null)} style={{ marginTop: '1rem' }}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
