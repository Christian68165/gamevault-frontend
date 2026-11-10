import { useState } from 'react'
import { api } from '../../services/api.js'
import { Card, Field, inputClass, SubmitButton, ErrorMessage, SuccessMessage } from '../ui.jsx'

const EMPTY = { name: '', description: '' }

export default function GenreForm({ onCreated }) {
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
      const created = await api.createGenre({ name: form.name.trim(), description: form.description.trim() })
      setSuccess(`Género "${created.name}" creado correctamente.`)
      setForm(EMPTY)
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card title="Nuevo género">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nombre">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="RPG" className={inputClass} />
        </Field>
        <Field label="Descripción">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Juegos de rol con progresión de personaje"
            className={`${inputClass} resize-none`}
          />
        </Field>
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <SubmitButton loading={saving}>Agregar género</SubmitButton>
      </form>
    </Card>
  )
}
