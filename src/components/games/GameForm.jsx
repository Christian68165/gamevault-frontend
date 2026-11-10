import { useState } from 'react'
import { api } from '../../services/api.js'
import { Card, Field, inputClass, SubmitButton, ErrorMessage, SuccessMessage } from '../ui.jsx'

const EMPTY = { title: '', price: '', stock: '', image_url: '', platform_id: '', genre_id: '' }

export default function GameForm({ platforms, genres, optionsLoading, optionsError, onRetryOptions, onCreated }) {
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
      const payload = {
        title: form.title.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        image_url: form.image_url.trim() || null,
        platform_id: Number(form.platform_id),
        genre_id: Number(form.genre_id),
      }
      const created = await api.createGame(payload)
      setSuccess(`Juego "${created.title}" agregado correctamente.`)
      setForm(EMPTY)
      onCreated()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const selectPlaceholder = (label) => (optionsLoading ? 'Cargando...' : `Selecciona ${label}`)

  return (
    <Card title="Agregar videojuego">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Título">
          <input name="title" value={form.title} onChange={handleChange} required placeholder="Elden Ring" className={inputClass} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Precio ($)">
            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required placeholder="49.99" className={inputClass} />
          </Field>
          <Field label="Stock">
            <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required placeholder="10" className={inputClass} />
          </Field>
        </div>
        <Field label="URL de portada (opcional)">
          <input name="image_url" type="url" value={form.image_url} onChange={handleChange} placeholder="https://..." className={inputClass} />
        </Field>
        <Field label="Plataforma">
          <select name="platform_id" value={form.platform_id} onChange={handleChange} required disabled={optionsLoading} className={inputClass}>
            <option value="">{selectPlaceholder('una plataforma')}</option>
            {platforms.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.company})
              </option>
            ))}
          </select>
        </Field>
        <Field label="Género">
          <select name="genre_id" value={form.genre_id} onChange={handleChange} required disabled={optionsLoading} className={inputClass}>
            <option value="">{selectPlaceholder('un género')}</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </Field>
        <ErrorMessage message={optionsError} onRetry={onRetryOptions} />
        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
        <SubmitButton loading={saving}>Agregar juego</SubmitButton>
      </form>
    </Card>
  )
}
