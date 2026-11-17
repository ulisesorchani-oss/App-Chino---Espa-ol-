# Máquinas de estado

> **Generado por `tools/gen-maquinas.js` a partir de las tablas que declara el código. No se edita a mano:** `node tools/gen-maquinas.js` lo regenera y `tools/check-maquinas.js` falla si está desactualizado.

Cada máquina es una tabla `from → to · evento` declarada con `acMachine(...)` (`state-machine.js`, compartido, sin dependencias). El estado solo cambia con `máquina.go(estado, evento)`; una asignación directa (`L.state = 'x'`) la frena el chequeo estático.

- **Modo estricto: SOLO en pruebas** (`window.AC_SM_STRICT = true`): una transición no declarada lanza. **En producción** se registra en `window.AC_SM_LOG` y se aplica igual.
- Si `state-machine.js` no carga, el módulo usa una máquina de respaldo que asigna sin validar: la app suena igual, solo se pierde la validación.
- Las filas **⚠️ conocida** son defectos de hoy declarados a propósito: describen lo que el código hace ahora (la prueba de oro por orden de eventos lo fija); arreglarlos es un cambio aparte.
- Los tokens de cancelación (`L.tok`, `audioReqTok`, …) NO son estado: identifican «una corrida».

## «Escuchar todo» (lecciones de aprendo chino)

Archivo: `lessons-listen.js` · prueba de oro: `tests/escuchar-todo-oro.test.js` (`tests/data/escuchar-todo-oro.json`).

### «Escuchar todo»: reproducción (`escuchar.reproduccion`)

Estados: `idle`, `playing`, `paused` · inicial: `idle`

```mermaid
stateDiagram-v2
    [*] --> idle
    idle --> playing : start
    playing --> paused : pausa
    paused --> playing : seguir
    playing --> idle : fin
    playing --> idle : corte
    paused --> idle : corte
    paused --> idle : fin (conocida)
```

| De | A | Evento | Estado de la fila | Qué es |
|---|---|---|---|---|
| `idle` | `playing` | `start` | declarada | ▶ Escuchar todo |
| `playing` | `paused` | `pausa` | declarada | ⏸ Pausar (también durante la espera de un audio) |
| `paused` | `playing` | `seguir` | declarada | ▶ Seguir |
| `playing` | `idle` | `fin` | declarada | se leyó la última línea |
| `playing`, `paused` | `idle` | `corte` | declarada | un corte (ver la tabla de cortes) |
| `paused` | `idle` | `fin` | ⚠️ **conocida** (pausa-muda) | si la última línea se lee sin voz (la voz del sistema no arranca), el tiempo de lectura sigue corriendo en pausa y la lección termina estando en pausa |

### «Escuchar todo»: espera del audio (`escuchar.espera`)

Estados: `libre`, `esperando` · inicial: `libre`

```mermaid
stateDiagram-v2
    [*] --> libre
    libre --> esperando : sin-audio-listo
    esperando --> libre : llego
    esperando --> libre : corte
    esperando --> libre : arranque
```

| De | A | Evento | Estado de la fila | Qué es |
|---|---|---|---|---|
| `libre` | `esperando` | `sin-audio-listo` | declarada | a la línea que toca todavía no le llegó el audio |
| `esperando` | `libre` | `llego` | declarada | llegó el audio (o el error): se sigue |
| `esperando` | `libre` | `corte` | declarada | un corte mientras esperaba |
| `esperando` | `libre` | `arranque` | declarada | defensa: start() deja la espera limpia (no debería haber nada en espera con la reproducción en reposo) |

### «Escuchar todo»: circuito del servidor de voz (`escuchar.circuito`)

Estados: `cerrado`, `abierto` · inicial: `cerrado`

```mermaid
stateDiagram-v2
    [*] --> cerrado
    cerrado --> abierto : dos-fallos
    abierto --> cerrado : fin
    abierto --> cerrado : corte
    abierto --> cerrado : arranque
```

| De | A | Evento | Estado de la fila | Qué es |
|---|---|---|---|---|
| `cerrado` | `abierto` | `dos-fallos` | declarada | CIRCUIT_AFTER líneas seguidas fallidas: no se pide nada más |
| `abierto` | `cerrado` | `fin` | declarada | termina la lección: el próximo «Escuchar todo» empieza con el circuito cerrado |
| `abierto` | `cerrado` | `corte` | declarada | un corte |
| `abierto` | `cerrado` | `arranque` | declarada | defensa: start() deja el circuito cerrado (cada lección empieza de cero) |

### Cortes (`stopAll(motivo)`)

Todo lo que para la escucha pasa por `stopAll(motivo)` con uno de estos motivos; cada uno lleva a `idle` / `libre` / `cerrado` con el evento `corte`.

| Motivo | Qué lo dispara |
|---|---|
| `boton` | ⏹ Parar |
| `cerrar` | ✕ y Atrás (#lq-close) |
| `escritura` | cambio 简/繁 (ac-script-change) |
| `linea` | 🔊 de una línea |
| `practicar` | Practicar → quiz |
| `ventana` | Esc o clic en el fondo (lesson-pop se oculta) |
| `vista` | la vista cambió (quiz, glosario, otra lección) |
| `api` | LQ_LISTEN.stop() |

## Lector de texto libre

Archivo: `reader.js` · prueba de oro: `tests/lector-oro.test.js` (`tests/data/lector-oro.json`).

### Lector: reproducción (`lector.reproduccion`)

Estados: `idle`, `playing`, `paused` · inicial: `idle`

```mermaid
stateDiagram-v2
    [*] --> idle
    idle --> playing : leer
    playing --> paused : pausa
    paused --> playing : seguir
    playing --> idle : fin
    playing --> idle : corte
    paused --> idle : corte
    paused --> idle : fin (conocida)
```

| De | A | Evento | Estado de la fila | Qué es |
|---|---|---|---|---|
| `idle` | `playing` | `leer` | declarada | 🔊 Leer: arranca una lectura nueva |
| `playing` | `paused` | `pausa` | declarada | ⏸ Pausar (también mientras carga un trozo) |
| `paused` | `playing` | `seguir` | declarada | ▶ Continuar |
| `playing` | `idle` | `fin` | declarada | se leyó el último trozo |
| `playing`, `paused` | `idle` | `corte` | declarada | stopReader(): lo llaman Limpiar, otra lectura/audio de la app (un solo audio a la vez) y toggleReaderPlay() al arrancar |
| `paused` | `idle` | `fin` | ⚠️ **conocida** (pausa-sin-voz) | sin voz del sistema (no hay speechSynthesis) los trozos que fallan se «leen» al instante: la lectura entera termina estando en pausa |

Defectos conocidos de esta máquina (no son transiciones; el oro los fija tal cual hasta que se arreglen):

- ⚠️ **R2** — una pausa MIENTRAS carga un trozo (botón «⏳ ...») deja el estado en `paused`, pero al llegar el trozo el audio suena igual, el botón vuelve a decir «⏸ Pausar» y el estado sigue en `paused` Escenario del oro: `R2-pausa-en-carga`.
- ⚠️ **R2b** — pausar y «Continuar» mientras carga el trozo siguiente llama a play() sobre el audio VIEJO (ya terminado): repite el trozo anterior hasta que llega el nuevo Escenario del oro: `R2-continuar-antes-de-llegar`.

### Lector: espera del trozo (`lector.espera`)

Estados: `libre`, `esperando` · inicial: `libre`

```mermaid
stateDiagram-v2
    [*] --> libre
    libre --> esperando : sin-trozo-listo
    esperando --> libre : llego
    esperando --> libre : corte
```

| De | A | Evento | Estado de la fila | Qué es |
|---|---|---|---|---|
| `libre` | `esperando` | `sin-trozo-listo` | declarada | al trozo que toca todavía no le llegó el audio |
| `esperando` | `libre` | `llego` | declarada | llegó el audio (o el error): se sigue |
| `esperando` | `libre` | `corte` | declarada | stopReader() mientras esperaba |

### Lector: motor de voz (`lector.motor`)

Estados: `ninguno`, `speech`, `audio` · inicial: `ninguno`

```mermaid
stateDiagram-v2
    [*] --> ninguno
    ninguno --> audio : trozo-con-audio
    speech --> audio : trozo-con-audio
    ninguno --> speech : trozo-sin-audio
    audio --> speech : trozo-sin-audio
    audio --> ninguno : fin
    speech --> ninguno : fin
    audio --> ninguno : corte
    speech --> ninguno : corte
```

| De | A | Evento | Estado de la fila | Qué es |
|---|---|---|---|---|
| `ninguno`, `speech` | `audio` | `trozo-con-audio` | declarada | el trozo suena con el audio del servidor |
| `ninguno`, `audio` | `speech` | `trozo-sin-audio` | declarada | el trozo falló: se lee con la voz del sistema |
| `audio`, `speech` | `ninguno` | `fin` | declarada | se leyó el último trozo |
| `audio`, `speech` | `ninguno` | `corte` | declarada | stopReader() |
