import { useState } from 'react'
import { api } from '../../services/api.js'
import { Card, Field, inputClass, SubmitButton, ErrorMessage, SuccessMessage } from '../ui.jsx'

const EMPTY = { name: '', company: '' }

export default function PlatformForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const created = await api.createPlatform({ name: form.name.trim(), company: form.company.trim() })
      setSuccess(`Plataforma "${created.name}" creada correctamente.`)
      setForm(EMPTY)
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card title="Nueva plataforma">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nombre">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="PlayStation 5" className={inputClass} />
        </Field>
        <Field label="Compañía">
          <input name="company" value={form.company} onChange={handleChange} required placeholder="Sony" className={inputClass} />
        </Field>
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <SubmitButton loading={saving}>Agregar plataforma</SubmitButton>
      </form>
    </Card>
  )
}
