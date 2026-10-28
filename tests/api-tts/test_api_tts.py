"""Pruebas de api/index.py y api/tts.py con edge-tts SIMULADO (ninguna llamada real).

    python3 -m unittest discover -s tests/api-tts -v        (o:  node tests/run-all.js api-tts)

Necesita Python 3 y fastapi; NO necesita edge-tts, red ni navegador: se inyecta un módulo
`edge_tts` falso con las mismas clases de error que usa el servidor.
"""
import ast
import asyncio
import importlib.util
import io
import json
import os
import random
import sys
import types
import unittest
from contextlib import redirect_stderr

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
API = os.path.join(RAIZ, "api")


# ---------------------------------------------------------------- edge_tts simulado
class NoAudioReceived(Exception): pass
class WebSocketError(Exception): pass
class UnexpectedResponse(Exception): pass
class SkewAdjustmentError(Exception): pass
class ClientResponseError(Exception):
    def __init__(self, status): super().__init__("HTTP %s" % status); self.status = status


GUION = []      # salidas por llamada a Communicate.stream(): "ok" | excepción | ("cuelga", s) | ("vacio",)
LLAMADAS = []   # (voz, rate) de cada Communicate creado
ENVUELO = {"ahora": 0, "max": 0}


class Communicate:
    def __init__(self, text, voice, **kw):
        self.text, self.voice, self.kw = text, voice, kw
        LLAMADAS.append((voice, kw.get("rate", "+0%")))

    async def stream(self):
        ENVUELO["ahora"] += 1
        ENVUELO["max"] = max(ENVUELO["max"], ENVUELO["ahora"])
        try:
            paso = GUION.pop(0) if GUION else "ok"
            if isinstance(paso, tuple) and paso[0] == "cuelga":
                await asyncio.sleep(paso[1])
                paso = "ok"
            if isinstance(paso, tuple) and paso[0] == "vacio":
                return
            if isinstance(paso, BaseException):
                raise paso
            yield {"type": "audio", "data": b"ID3" + b"\x00" * 40}
        finally:
            ENVUELO["ahora"] -= 1


def _inyectar_edge_tts():
    mod = types.ModuleType("edge_tts")
    mod.Communicate = Communicate
    mod.__version__ = "7.3.1"
    exc = types.ModuleType("edge_tts.exceptions")
    for c in (NoAudioReceived, WebSocketError, UnexpectedResponse, SkewAdjustmentError):
        setattr(exc, c.__name__, c)
    mod.exceptions = exc
    sys.modules["edge_tts"] = mod
    sys.modules["edge_tts.exceptions"] = exc


def _cargar(nombre, version="7.3.1"):
    """Carga api/<nombre>.py con `edge-tts` instalado = version (se simula importlib.metadata)."""
    from importlib import metadata
    real = metadata.version
    metadata.version = lambda n: version if n == "edge-tts" else real(n)
    spec = importlib.util.spec_from_file_location("api_" + nombre, os.path.join(API, nombre + ".py"))
    m = importlib.util.module_from_spec(spec)
    err = io.StringIO()
    try:
        with redirect_stderr(err):
            spec.loader.exec_module(m)
    finally:
        metadata.version = real
    m.LOG_ARRANQUE = err.getvalue()
    return m


_inyectar_edge_tts()
INDEX = _cargar("index")
TTS = _cargar("tts")


def cuerpo(r): return json.loads(r.body.decode())


class Base(unittest.IsolatedAsyncioTestCase):
    M = INDEX

    def setUp(self):
        m = self.M
        GUION.clear(); LLAMADAS.clear(); ENVUELO.update(ahora=0, max=0)
        m._TTS_CACHE.clear(); m._SEM = None; m._SEM_LOOP = None
        self._orig = {k: getattr(m, k) for k in ("BACKOFF_MIN_S", "BACKOFF_MAX_S", "ATTEMPT_TIMEOUT_S",
                                                  "TOTAL_BUDGET_S", "QUEUE_WAIT_S", "MAX_CONCURRENT", "TW_ATTEMPT_CAP_S", "TW_PHASE_BUDGET_S", "FALLBACK_MIN_WINDOW_S")}
        m.BACKOFF_MIN_S, m.BACKOFF_MAX_S = 0.01, 0.02   # los tests no esperan 0,4-0,8 s de verdad
        self._log_real = m._log
        self.logs = []
        m._log = self.logs.append                        # sin ruido en la consola (un test usa el stderr real)

    def tearDown(self):
        for k, v in self._orig.items(): setattr(self.M, k, v)
        self.M._log = self._log_real

    async def pedir(self, texto="你好", via_get=False, **extra):
        body = dict(text=texto, lang="zh-CN", voice="m", speed=0.85); body.update(extra)
        antes = len(self.logs)
        r = await self.M.tts_endpoint(body, via_get=via_get)
        return r, self.logs[antes:]


class DivergenciaTest(unittest.TestCase):
    def test_index_y_tts_tienen_el_mismo_codigo(self):
        def arbol(n): return ast.parse(open(os.path.join(API, n + ".py"), encoding="utf-8").read())
        a, b = arbol("index"), arbol("tts")
        if ast.dump(a) != ast.dump(b):
            for i, (x, y) in enumerate(zip(a.body, b.body)):
                if ast.dump(x) != ast.dump(y):
                    self.fail("api/index.py y api/tts.py divergen en el nodo %d (línea %s vs %s)" % (i, x.lineno, y.lineno))
            self.fail("api/index.py y api/tts.py tienen distinta cantidad de definiciones: %d vs %d" % (len(a.body), len(b.body)))

    def test_requirements_sin_piper_y_con_edge_tts_nuevo(self):
        req = open(os.path.join(RAIZ, "requirements.txt")).read().lower()
        for malo in ("piper", "numpy", "soundfile", "huggingface"):
            self.assertNotIn(malo, req)
        self.assertIn("edge-tts>=7.3.1,<8", req.replace(" ", ""))
        for n in ("index", "tts"):
            src = open(os.path.join(API, n + ".py"), encoding="utf-8").read()
            for malo in ("PiperVoice", "PIPER_MODEL", "synth_piper", "import numpy"):
                self.assertNotIn(malo, src, n)

    def test_el_arranque_avisa_si_edge_tts_es_anterior_a_7_3_1(self):
        self.assertIn("tts-boot edge_tts=7.3.1", INDEX.LOG_ARRANQUE); self.assertNotIn("AVISO", INDEX.LOG_ARRANQUE)
        viejo = _cargar("index", version="7.2.8")
        self.assertIn("AVISO=menor_a_7.3.1", viejo.LOG_ARRANQUE)


class VelocidadTest(Base):
    def test_rate_de_las_tres_velocidades_de_la_app(self):
        self.assertEqual([self.M.speed_to_rate(s) for s in (0.85, 1, 0.7)], ["-15%", "+0%", "-30%"])

    async def test_el_rate_llega_a_edge_tts(self):
        r, _ = await self.pedir(speed=0.7)
        self.assertEqual(r.status_code, 200); self.assertEqual(LLAMADAS[-1], ("zh-CN-YunjianNeural", "-30%"))


class ExitoTest(Base):
    async def test_exito_a_la_primera_y_cabeceras_de_get(self):
        r, log = await self.pedir(via_get=True)
        self.assertEqual(r.status_code, 200)
        d = cuerpo(r); self.assertEqual((d["mime"], d["voice"], d["speed"], d["cached"]), ("audio/mpeg", "zh-CN-YunjianNeural", 0.85, False))
        self.assertIn("immutable", r.headers["cache-control"]); self.assertEqual(r.headers["x-tts-audio"], "1")
        self.assertEqual(len(log), 1); self.assertIn("intento=1 res=ok", log[0])

    async def test_segundo_pedido_sale_de_la_cache_sin_sintetizar_ni_ocupar_lugar(self):
        await self.pedir(); n = len(LLAMADAS)
        r, log = await self.pedir()
        self.assertEqual(len(LLAMADAS), n); self.assertTrue(cuerpo(r)["cached"]); self.assertIn("res=cache", log[0])

    async def test_post_no_lleva_cache_control_de_cdn(self):
        r, _ = await self.pedir(via_get=False); self.assertNotIn("immutable", r.headers.get("cache-control", ""))


class ReintentoTest(Base):
    async def recupera(self, falla, codigo_esperado=None):
        GUION[:] = [falla, "ok"]
        r, log = await self.pedir()
        self.assertEqual(r.status_code, 200, log); self.assertEqual(len(LLAMADAS), 2)
        self.assertIn("intento=2 res=ok exc=%s" % type(falla).__name__, log[0])

    async def test_recupera_al_segundo_intento_noaudio(self): await self.recupera(NoAudioReceived("x"))
    async def test_recupera_403(self): await self.recupera(ClientResponseError(403))
    async def test_recupera_5xx(self): await self.recupera(ClientResponseError(503))
    async def test_recupera_websocket(self): await self.recupera(WebSocketError("cerrado"))
    async def test_recupera_conexion(self): await self.recupera(ConnectionResetError("reset"))
    async def test_recupera_audio_vacio(self):
        GUION[:] = [("vacio",), "ok"]; r, log = await self.pedir()
        self.assertEqual(r.status_code, 200); self.assertIn("intento=2", log[0])

    async def test_recupera_timeout_de_un_intento(self):
        self.M.ATTEMPT_TIMEOUT_S = 0.15; self.M.TOTAL_BUDGET_S = 3
        GUION[:] = [("cuelga", 5), "ok"]
        r, log = await self.pedir()
        self.assertEqual(r.status_code, 200); self.assertIn("intento=2 res=ok exc=TimeoutError", log[0])

    async def test_no_reintenta_errores_que_no_son_transitorios(self):
        for exc, cod in ((ClientResponseError(404), "http_404"), (ClientResponseError(429), "limite"),
                         (UnexpectedResponse("x"), "respuesta"), (ValueError("voz"), "error")):
            GUION[:] = [exc, "ok"]; self.M._TTS_CACHE.clear(); LLAMADAS.clear()
            r, log = await self.pedir()
            self.assertEqual((r.status_code, cuerpo(r)["codigo"], len(LLAMADAS)), (502, cod, 1), cod)
            self.assertIn("intento=1", log[0])

    async def test_la_espera_entre_intentos_es_de_0_4_a_0_8_s_con_azar(self):
        m = self.M; m.BACKOFF_MIN_S, m.BACKOFF_MAX_S = 0.4, 0.8
        pausas = []; real = asyncio.sleep
        async def espia(s, *a): pausas.append(s); await real(0)
        m.asyncio = types.SimpleNamespace(**{k: getattr(asyncio, k) for k in dir(asyncio) if not k.startswith("__")})
        m.asyncio.sleep = espia
        try:
            for _ in range(12):
                GUION[:] = [NoAudioReceived("x"), "ok"]; m._TTS_CACHE.clear(); await self.pedir()
        finally:
            m.asyncio = asyncio
        self.assertEqual(len(pausas), 12); self.assertTrue(all(0.4 <= p <= 0.8 for p in pausas), pausas)
        self.assertGreater(len(set(pausas)), 1, "sin azar")


class FalloPersistenteTest(Base):
    async def test_dos_intentos_y_502_con_cuerpo_corto_y_no_store(self):
        GUION[:] = [NoAudioReceived("No audio was received"), NoAudioReceived("No audio was received")]
        r, log = await self.pedir(texto="我的秘密文字")
        self.assertEqual(r.status_code, 502); self.assertEqual(len(LLAMADAS), 2)
        self.assertEqual(cuerpo(r), {"error": "tts no disponible", "codigo": "sin_audio"})
        self.assertEqual(r.headers["cache-control"], "no-store"); self.assertNotIn("x-tts-audio", r.headers)
        self.assertIn("intento=2 res=error_sin_audio exc=NoAudioReceived,NoAudioReceived", log[0])

    async def test_el_error_no_se_guarda_en_la_cache(self):
        GUION[:] = [NoAudioReceived("x")] * 2; await self.pedir()
        r, _ = await self.pedir(); self.assertEqual(r.status_code, 200); self.assertFalse(cuerpo(r)["cached"])

    async def test_get_con_error_tambien_es_no_store(self):
        GUION[:] = [ClientResponseError(403)] * 2
        r, _ = await self.pedir(via_get=True); self.assertEqual((r.status_code, r.headers["cache-control"]), (502, "no-store"))
        self.assertEqual(cuerpo(r)["codigo"], "403")

    async def test_tope_de_tiempo_total(self):
        m = self.M; m.ATTEMPT_TIMEOUT_S = 0.3; m.TOTAL_BUDGET_S = 0.45; m.BACKOFF_MIN_S = m.BACKOFF_MAX_S = 0.05
        GUION[:] = [("cuelga", 5), ("cuelga", 5)]
        t0 = asyncio.get_running_loop().time(); r, log = await self.pedir(); dt = asyncio.get_running_loop().time() - t0
        self.assertEqual((r.status_code, cuerpo(r)["codigo"]), (502, "timeout"))
        self.assertLess(dt, 0.45 + 0.25, "se pasó del tope total (%.2fs)" % dt)

    async def test_si_no_queda_ventana_no_hay_segundo_intento(self):
        m = self.M; m.ATTEMPT_TIMEOUT_S = 0.3; m.TOTAL_BUDGET_S = 0.3; m.BACKOFF_MIN_S = m.BACKOFF_MAX_S = 0.05
        GUION[:] = [("cuelga", 5), "ok"]
        r, log = await self.pedir(); self.assertEqual((r.status_code, len(LLAMADAS)), (502, 1)); self.assertIn("intento=1", log[0])

    async def test_textos_largos_tienen_mas_tiempo_por_intento(self):
        corto, _ = self.M._budget(20); largo, tot = self.M._budget(700)
        self.assertEqual(corto, 8.0); self.assertGreater(largo, corto); self.assertLessEqual(largo, 25.0); self.assertGreater(tot, largo)


class Simulacion90Test(Base):
    async def test_90_por_ciento_de_fallos(self):
        rng = random.Random(7)
        tipos = [NoAudioReceived("x"), ClientResponseError(403), ClientResponseError(502), WebSocketError("w")]
        ok = recup = caidos = 0
        for i in range(60):
            primero = rng.random() < 0.9; segundo = rng.random() < 0.9
            GUION[:] = [rng.choice(tipos) if primero else "ok"] + ([rng.choice(tipos) if segundo else "ok"] if primero else [])
            LLAMADAS.clear(); self.M._TTS_CACHE.clear()
            r, log = await self.pedir(texto="句子%d" % i)
            self.assertLessEqual(len(LLAMADAS), 2)
            if not primero: ok += 1; self.assertEqual(r.status_code, 200)
            elif not segundo: recup += 1; self.assertEqual(r.status_code, 200); self.assertIn("intento=2", log[0])
            else: caidos += 1; self.assertEqual(r.status_code, 502); self.assertEqual(r.headers["cache-control"], "no-store")
        self.assertEqual(ok + recup + caidos, 60); self.assertGreater(recup, 0); self.assertGreater(caidos, 0)


class SemaforoTest(Base):
    async def test_nunca_mas_de_2_sintesis_a_la_vez(self):
        GUION[:] = [("cuelga", 0.15)] * 6
        res = await asyncio.gather(*[self.pedir(texto="t%d" % i) for i in range(6)])
        self.assertEqual(ENVUELO["max"], 2); self.assertTrue(all(r.status_code == 200 for r, _ in res))
        self.assertEqual(self.M._SEM._value, 2, "el semáforo perdió lugares")

    async def test_si_se_agota_la_espera_503_busy_con_retry_after(self):
        self.M.QUEUE_WAIT_S = 0.1; GUION[:] = [("cuelga", 0.6)] * 2
        res = await asyncio.gather(*[self.pedir(texto="b%d" % i) for i in range(4)])
        estados = sorted(r.status_code for r, _ in res); self.assertEqual(estados, [200, 200, 503, 503])
        r = next(r for r, _ in res if r.status_code == 503)
        self.assertEqual(cuerpo(r), {"error": "tts no disponible", "codigo": "busy"})
        self.assertEqual((r.headers["cache-control"], r.headers["retry-after"]), ("no-store", "2"))
        self.assertEqual(self.M._SEM._value, 2)
        r2, _ = await self.pedir(texto="despues"); self.assertEqual(r2.status_code, 200)

    async def test_los_fallos_y_timeouts_liberan_el_lugar(self):
        self.M.ATTEMPT_TIMEOUT_S = 0.1; self.M.TOTAL_BUDGET_S = 0.5
        GUION[:] = [("cuelga", 5)] * 4 + [NoAudioReceived("x")] * 4
        await asyncio.gather(*[self.pedir(texto="l%d" % i) for i in range(4)])
        self.assertEqual(self.M._SEM._value, 2)

    async def test_la_cache_no_pasa_por_el_semaforo(self):
        await self.pedir(); self.M.QUEUE_WAIT_S = 0.05
        sem = self.M._semaphore(); await sem.acquire(); await sem.acquire()
        try: r, _ = await self.pedir(); self.assertEqual(r.status_code, 200)
        finally: sem.release(); sem.release()


class RegistroTest(Base):
    async def test_una_linea_por_pedido_sin_el_texto(self):
        secreto = "我的秘密文字不该出现在日志里"
        GUION[:] = [NoAudioReceived("x"), "ok"]
        r, log = await self.pedir(texto=secreto)
        self.assertEqual(len(log), 1)
        for campo in ("voz=zh-CN-YunjianNeural", "rate=-15%", "largo=%d" % len(secreto), "intento=2", "res=ok", "exc=NoAudioReceived",
                      "dur_ms=", "edge_tts=7.3.1"):
            self.assertIn(campo, log[0])
        self.assertNotIn(secreto, log[0]); self.assertNotIn("你", log[0])

    async def test_el_log_de_error_tampoco_lleva_texto(self):
        GUION[:] = [ClientResponseError(403)] * 2
        _, log = await self.pedir(texto="secreto-abc"); self.assertNotIn("secreto-abc", log[0]); self.assertIn("res=error_403", log[0])


class StderrRealTest(Base):
    async def test_la_linea_sale_por_stderr(self):
        self.M._log = self._log_real
        err = io.StringIO()
        with redirect_stderr(err):
            r = await self.M.tts_endpoint(dict(text="你好", lang="zh-CN", voice="f", speed=1))
        lineas = [l for l in err.getvalue().splitlines() if l.strip()]
        self.assertEqual(r.status_code, 200); self.assertEqual(len(lineas), 1); self.assertTrue(lineas[0].startswith("tts voz=zh-CN-XiaoxiaoNeural"))


class TellTest(Base):
    async def test_get_sin_parametros_informa_la_version(self):
        from starlette.requests import Request
        req = Request({"type": "http", "method": "GET", "path": "/api/tts", "query_string": b"", "headers": []})
        r = await self.M.catch_get(req)
        d = cuerpo(r)
        self.assertTrue(d["ok"]); self.assertEqual(d["edge_tts"], "7.3.1"); self.assertEqual(r.headers["cache-control"], "no-store")

    async def test_get_con_texto_pasa_por_tts(self):
        from starlette.requests import Request
        req = Request({"type": "http", "method": "GET", "path": "/api/tts", "headers": [],
                       "query_string": b"text=%E4%BD%A0%E5%A5%BD&lang=zh-CN&voice=f&speed=1&cv=2"})
        r = await self.M.catch_get(req)
        self.assertEqual((r.status_code, r.headers.get("x-tts-audio")), (200, "1"))


class ValidacionTest(Base):
    async def test_errores_de_entrada_tambien_son_no_store(self):
        r, _ = await self.pedir(texto="   "); self.assertEqual((r.status_code, r.headers["cache-control"]), (400, "no-store"))
        r, _ = await self.pedir(texto="a" * 2001); self.assertEqual((r.status_code, r.headers["cache-control"]), (413, "no-store"))


class ClasificacionTest(unittest.TestCase):
    def test_codigos_cortos(self):
        c = INDEX._classify
        casos = [(NoAudioReceived(), ("sin_audio", True)), (ClientResponseError(403), ("403", True)), (ClientResponseError(500), ("5xx", True)),
                 (ClientResponseError(504), ("5xx", True)), (WebSocketError(), ("ws", True)), (asyncio.TimeoutError(), ("timeout", True)),
                 (SkewAdjustmentError(), ("reloj", True)), (RuntimeError(), ("error", False))]
        for exc, esperado in casos: self.assertEqual(c(exc), esperado, type(exc).__name__)

    def test_con_aiohttp_real_si_esta_instalado(self):
        try: import aiohttp
        except ImportError: self.skipTest("aiohttp no instalado")
        from yarl import URL
        info = aiohttp.RequestInfo(URL("https://x"), "GET", {}, URL("https://x"))
        self.assertEqual(INDEX._classify(aiohttp.ClientResponseError(info, (), status=403)), ("403", True))
        self.assertEqual(INDEX._classify(aiohttp.ClientConnectionError()), ("ws", True))
        self.assertEqual(INDEX._classify(aiohttp.ServerDisconnectedError()), ("ws", True))


class VozAlternativaTest(Base):
    """zh-TW que agota sus reintentos SOLO con sin_audio → UNA prueba con la continental; esa respuesta no se guarda."""

    async def tw(self, voz="tw-m", via_get=False, texto="你好", **extra):
        return await self.pedir(texto=texto, via_get=via_get, lang="zh-TW", voice=voz, **extra)

    async def test_tw_m_cae_a_yunjian_con_todas_las_marcas_de_no_guardar(self):
        GUION[:] = [NoAudioReceived("x"), "ok"]          # tw-m: UN solo intento antes del respaldo
        r, log = await self.tw("tw-m", via_get=True)
        self.assertEqual(r.status_code, 200)
        self.assertEqual([v for v, _ in LLAMADAS], ["zh-TW-YunJheNeural", "zh-CN-YunjianNeural"])
        d = cuerpo(r)
        self.assertEqual((d["voice"], d["fallback"], d["cached"], d["mime"], d["speed"]), ("zh-CN-YunjianNeural", True, False, "audio/mpeg", 0.85))
        self.assertEqual(r.headers["cache-control"], "no-store")
        self.assertEqual(r.headers["x-tts-fallback"], "1")
        self.assertEqual(r.headers["x-tts-audio"], "1")     # el cliente acepta un GET solo con esta marca
        self.assertNotIn("immutable", r.headers["cache-control"]); self.assertNotIn("public", r.headers["cache-control"])
        self.assertEqual(len(self.M._TTS_CACHE), 0, "el fallback entró en la caché en memoria")
        self.assertEqual(len(log), 1); self.assertIn("fallback=1", log[0]); self.assertIn("res=ok", log[0]); self.assertIn("intento=2", log[0])

    async def test_tw_m_un_solo_intento_y_tw_f_dos(self):
        GUION[:] = [NoAudioReceived("x")] * 10
        await self.tw("tw-m")
        self.assertEqual([v for v, _ in LLAMADAS], ["zh-TW-YunJheNeural", "zh-CN-YunjianNeural"], "tw-m: 1 intento + respaldo")
        LLAMADAS.clear(); GUION[:] = [NoAudioReceived("x")] * 10; self.M._TTS_CACHE.clear()
        await self.tw("tw-f")
        self.assertEqual([v for v, _ in LLAMADAS], ["zh-TW-HsiaoChenNeural", "zh-TW-HsiaoChenNeural", "zh-CN-XiaoxiaoNeural"], "tw-f: 2 intentos + respaldo")
        LLAMADAS.clear(); GUION[:] = [NoAudioReceived("x")] * 10
        await self.pedir(lang="zh-CN", voice="m")
        self.assertEqual(len(LLAMADAS), 2, "las continentales siguen con 2 intentos y sin respaldo")

    async def test_apagado_tw_m_vuelve_a_dos_intentos(self):
        self.M.TW_UN_SOLO_INTENTO = set()
        try:
            GUION[:] = [NoAudioReceived("x"), NoAudioReceived("x"), "ok"]
            r, _ = await self.tw("tw-m")
            self.assertEqual([v for v, _ in LLAMADAS], ["zh-TW-YunJheNeural", "zh-TW-YunJheNeural", "zh-CN-YunjianNeural"])
            self.assertEqual((r.status_code, cuerpo(r)["fallback"]), (200, True))
        finally:
            self.M.TW_UN_SOLO_INTENTO = {"zh-TW-YunJheNeural"}

    async def test_tw_f_cae_a_xiaoxiao_tambien_por_post(self):
        GUION[:] = [NoAudioReceived("x"), NoAudioReceived("x"), "ok"]
        r, log = await self.tw("tw-f", via_get=False)
        self.assertEqual((r.status_code, cuerpo(r)["voice"], cuerpo(r)["fallback"]), (200, "zh-CN-XiaoxiaoNeural", True))
        self.assertEqual((r.headers["cache-control"], r.headers["x-tts-fallback"]), ("no-store", "1"))
        self.assertEqual(len(self.M._TTS_CACHE), 0)

    async def test_el_fallback_nunca_se_sirve_de_la_cache_ni_pisa_la_voz_de_taiwan(self):
        GUION[:] = [NoAudioReceived("x"), "ok"]
        await self.tw("tw-m")
        n = len(LLAMADAS)
        r, _ = await self.tw("tw-m")      # taiwán responde bien esta vez: sale de Taiwán, no del fallback anterior
        self.assertEqual(r.status_code, 200); self.assertGreater(len(LLAMADAS), n)
        d = cuerpo(r); self.assertEqual(d["voice"], "zh-TW-YunJheNeural"); self.assertNotIn("fallback", d); self.assertFalse(d["cached"])
        self.assertIn("immutable", self.M._json_payload(dict(d), True).headers["cache-control"])
        self.assertEqual(len(self.M._TTS_CACHE), 1)   # esa SÍ se guardó, con su clave de Taiwán
        r3, _ = await self.tw("tw-m"); self.assertTrue(cuerpo(r3)["cached"]); self.assertEqual(cuerpo(r3)["voice"], "zh-TW-YunJheNeural")

    async def test_la_continental_tambien_falla_502_sin_marcas_de_fallback(self):
        GUION[:] = [NoAudioReceived("x")] * 2
        r, log = await self.tw("tw-m")
        self.assertEqual((r.status_code, cuerpo(r)), (502, {"error": "tts no disponible", "codigo": "sin_audio"}))
        self.assertEqual(r.headers["cache-control"], "no-store"); self.assertNotIn("x-tts-fallback", r.headers)
        self.assertEqual(len(LLAMADAS), 2); self.assertEqual(len(self.M._TTS_CACHE), 0)
        self.assertIn("res=error_sin_audio", log[0]); self.assertIn("fallback=0", log[0])

    async def test_un_solo_intento_de_continental(self):
        GUION[:] = [NoAudioReceived("x")] * 10
        await self.tw("tw-f"); self.assertEqual(len(LLAMADAS), 3)

    async def test_no_hay_fallback_para_timeouts_ni_403_ni_5xx_ni_mezclas(self):
        self.M.TW_ATTEMPT_CAP_S = 0.1; self.M.TW_PHASE_BUDGET_S = 2.0
        casos = {"timeout": [("cuelga", 5), ("cuelga", 5)], "403": [ClientResponseError(403)] * 2, "5xx": [ClientResponseError(503)] * 2,
                 "sin_audio y luego timeout": [NoAudioReceived("x"), ("cuelga", 5)], "timeout y luego sin_audio": [("cuelga", 5), NoAudioReceived("x")],
                 "ws": [WebSocketError("w")] * 2}
        for nombre, guion in casos.items():
            GUION[:] = guion + ["ok"]; LLAMADAS.clear(); self.M._TTS_CACHE.clear()
            r, log = await self.tw("tw-f")
            self.assertEqual(r.status_code, 502, nombre); self.assertEqual(len(LLAMADAS), 2, nombre)
            self.assertTrue(all(v == "zh-TW-HsiaoChenNeural" for v, _ in LLAMADAS), nombre)
            self.assertNotIn("x-tts-fallback", r.headers, nombre); self.assertIn("fallback=0", log[0], nombre)
        # tw-m (un solo intento): timeout / 403 / 5xx / ws tampoco prueban la continental
        for nombre, guion in {"timeout": [("cuelga", 5)], "403": [ClientResponseError(403)], "5xx": [ClientResponseError(503)], "ws": [WebSocketError("w")]}.items():
            GUION[:] = guion + ["ok"]; LLAMADAS.clear(); self.M._TTS_CACHE.clear()
            r, log = await self.tw("tw-m")
            self.assertEqual(r.status_code, 502, "tw-m " + nombre); self.assertEqual(len(LLAMADAS), 1, "tw-m " + nombre)
            self.assertNotIn("x-tts-fallback", r.headers, "tw-m " + nombre)

    async def test_las_voces_continentales_no_tienen_fallback(self):
        GUION[:] = [NoAudioReceived("x")] * 3 + ["ok"]
        r, _ = await self.pedir(lang="zh-CN", voice="m")
        self.assertEqual((r.status_code, len(LLAMADAS)), (502, 2))
        GUION[:] = [NoAudioReceived("x")] * 3 + ["ok"]; LLAMADAS.clear()
        r, _ = await self.pedir(lang="es-AR", voice="ar-f", texto="Hola")
        self.assertEqual((r.status_code, len(LLAMADAS)), (502, 2))

    async def test_busy_no_dispara_fallback(self):
        self.M.QUEUE_WAIT_S = 0.05
        sem = self.M._semaphore(); await sem.acquire(); await sem.acquire()
        try:
            GUION[:] = ["ok"]
            r, _ = await self.tw("tw-m")
            self.assertEqual((r.status_code, cuerpo(r)["codigo"]), (503, "busy")); self.assertEqual(len(LLAMADAS), 0)
            self.assertNotIn("x-tts-fallback", r.headers)
        finally: sem.release(); sem.release()

    async def test_tiempos_el_intento_de_taiwan_tiene_tope_y_el_total_no_pasa_de_12_s(self):
        m = self.M
        self.assertLessEqual(m.TW_ATTEMPT_CAP_S, 5.0); self.assertGreaterEqual(m.TW_ATTEMPT_CAP_S, 4.0)
        self.assertLessEqual(m.TW_PHASE_BUDGET_S + m.ATTEMPT_TIMEOUT_S, m.TOTAL_BUDGET_S + 3.0)
        # escala reducida: fase de Taiwán ≤ 0.4 s, total 0.9 s; la continental cuelga → corta por el tope total
        m.TW_ATTEMPT_CAP_S = 0.2; m.TW_PHASE_BUDGET_S = 0.4; m.ATTEMPT_TIMEOUT_S = 0.5; m.TOTAL_BUDGET_S = 0.9
        GUION[:] = [NoAudioReceived("x"), NoAudioReceived("x"), ("cuelga", 5)]
        t0 = asyncio.get_running_loop().time(); r, log = await self.tw("tw-f"); dt = asyncio.get_running_loop().time() - t0
        self.assertEqual(r.status_code, 502); self.assertLess(dt, 0.9 + 0.3, "se pasó del total (%.2f s)" % dt)

    async def test_si_no_queda_ventana_no_se_prueba_la_continental(self):
        m = self.M
        m.TW_ATTEMPT_CAP_S = 0.2; m.TW_PHASE_BUDGET_S = 1.5; m.TOTAL_BUDGET_S = 3.0; m.FALLBACK_MIN_WINDOW_S = 5.0
        GUION[:] = [NoAudioReceived("x"), NoAudioReceived("x"), "ok"]
        r, _ = await self.tw("tw-f"); self.assertEqual((r.status_code, len(LLAMADAS)), (502, 2))

    async def test_con_karaoke_el_fallback_trae_los_tiempos_de_la_voz_que_sono(self):
        GUION[:] = [NoAudioReceived("x"), NoAudioReceived("x"), "ok"]
        r, _ = await self.tw("tw-f", karaoke="1")
        self.assertEqual((r.status_code, cuerpo(r)["fallback"]), (200, True)); self.assertEqual(len(self.M._TTS_CACHE), 0)

    async def test_cors_expone_los_encabezados_que_lee_el_cliente(self):
        cfg = next(mw for mw in self.M.app.user_middleware if mw.cls.__name__ == "CORSMiddleware")
        expuestos = [h.lower() for h in cfg.kwargs.get("expose_headers", [])]
        for h in ("x-tts-audio", "x-tts-fallback", "retry-after"): self.assertIn(h, expuestos)


class MismoComportamientoTest(Base):
    """Las mismas pruebas de humo contra api/tts.py (el código es idéntico; esto lo comprueba corriendo)."""
    M = TTS

    async def test_tts_py_reintenta_y_responde_igual(self):
        GUION[:] = [NoAudioReceived("x"), "ok"]; r, log = await self.pedir(); self.assertEqual(r.status_code, 200); self.assertIn("intento=2", log[0])
        GUION[:] = [NoAudioReceived("x")] * 2; self.M._TTS_CACHE.clear()
        r, _ = await self.pedir(texto="otro"); self.assertEqual(cuerpo(r), {"error": "tts no disponible", "codigo": "sin_audio"})


if __name__ == "__main__":
    unittest.main(verbosity=2)
