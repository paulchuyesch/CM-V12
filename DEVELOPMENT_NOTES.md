# Notas de Desarrollo - CM-V8

## ⚠️ Configuración del API Backend

El archivo `.env` controla a qué servidor se conecta la aplicación:

| Entorno | URL | Cuándo usar |
|---------|-----|-------------|
| **Local** | `http://localhost:8000` | Desarrollo y pruebas de cambios |
| **Producción** | `https://web-production-8b384.up.railway.app` | Versión en vivo |

### Para probar cambios locales:
1. Asegúrate de que `.env` tenga: `VITE_API_URL="http://localhost:8000"`
2. Inicia el backend: `cd mi_backend_python && python3 -m uvicorn main:app --reload --port 8000`
3. Inicia el frontend: `npm run dev`

### Para usar producción:
1. Cambia `.env` a: `VITE_API_URL="https://web-production-8b384.up.railway.app"`
2. Reinicia el frontend: `npm run dev`

---

## Cambios Recientes (Enero 2026)

### Multas Acumulativas SUNAFIL
- **Antes**: Solo se calculaba la multa de la severidad máxima
- **Ahora**: Se suman las multas de TODAS las infracciones detectadas
- **Fórmula**: `(count_leves × multa_leve) + (count_graves × multa_grave) + (count_muy_graves × multa_muy_grave)`

### Archivos modificados:
- `mi_backend_python/main.py` - Función `calcular_multa_sunafil()`
- `src/hooks/useRiskCalculator.ts` - Hook de cálculo en frontend
