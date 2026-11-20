# Aviso del service worker · textos pendientes de revisión

Textos nuevos de `UI_STRINGS` (`app.js`) del cartel de versión nueva, de la fila «Modo sin conexión» de Yo → Ajustes y del aviso sin conexión (`sw-aviso.js`).
**El español lo escribió Claude; el chino de cn-es (interfaz en chino) está pendiente de revisión por Ulises.**

| Clave | Español (es-cn) | Chino (cn-es) · PENDIENTE |
|---|---|---|
| `swNuevaTxt` | Hay una versión nueva de la app. | 应用有新版本。 |
| `swActualizar` | Actualizar | 更新 |
| `swDespues` | Después | 稍后 |
| `swCerrar` | Cerrar | 关闭 |
| `setOffline` | Modo sin conexión | 离线模式 |
| `swEstadoOk` | Completo | 完整 |
| `swEstadoFaltan` | Incompleto · archivos sin descargar: {n} | 不完整 · 未下载的文件：{n} |
| `swReintentar` | Reintentar | 重试 |
| `swReintentando` | Descargando… | 下载中… |
| `swOfflineTxt` | Modo sin conexión incompleto · archivos sin descargar: {n}. Conectate a internet para completarlos. | 离线模式不完整 · 未下载的文件：{n}。请联网后补全。 |

Comportamiento: el cartel aparece cuando llega una versión nueva con la pestaña abierta; la página nunca se recarga sola, solo
al tocar «Actualizar». La primera instalación no avisa.

Estado del modo sin conexión: Yo → Ajustes muestra «Completo» o «Incompleto · archivos sin descargar: N» (con la lista y «Reintentar»).
Como aviso visible sale solo sin conexión y con algo faltante, una vez por sesión, y sin invitar a recargar. Al abrir con conexión y con algo
faltante se reintenta una sola vez por sesión, en silencio.
