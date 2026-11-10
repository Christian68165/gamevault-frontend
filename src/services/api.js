const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

async function parseError(response) {
  try {
    const data = await response.json()
    if (typeof data?.detail === 'string') return data.detail
    if (Array.isArray(data?.detail)) {
      return data.detail.map((d) => `${d.loc?.slice(-1)[0] ?? ''}: ${d.msg}`).join(' | ')
    }
    return JSON.stringify(data)
  } catch {
    return response.statusText
  }
}

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('No se pudo conectar con la API. Verifica tu conexión o la URL configurada.')
  }
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${await parseError(response)}`)
  }
  return response.json()
}

export const api = {
  getPlatforms: () => request('/platforms'),
  createPlatform: (data) => request('/platforms', { method: 'POST', body: JSON.stringify(data) }),
  getGenres: () => request('/genres'),
  createGenre: (data) => request('/genres', { method: 'POST', body: JSON.stringify(data) }),
  getGames: () => request('/games'),
  createGame: (data) => request('/games', { method: 'POST', body: JSON.stringify(data) }),
}
