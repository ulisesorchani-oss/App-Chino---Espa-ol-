#!/usr/bin/env python3
"""Convierte con OpenCC: simplificado -> tradicional de Taiwán (s2tw) y vuelve (tw2s).
Entrada (stdin): lista JSON de textos simplificados.
Salida (stdout): {"t": [...], "back": [...], "raw": [...], "version": "..."}
  raw  = s2tw puro;  t = raw + las correcciones de config.json (fallos conocidos de s2tw);  back = tw2s(t).
Requiere:  pip install opencc   (la misma conversión s2tw que usan los textos v1)."""
import json, os, re, sys
import opencc
s2tw, tw2s = opencc.OpenCC('s2tw'), opencc.OpenCC('tw2s')
cfg = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'config.json'), encoding='utf8'))
reglas = [(re.compile(a), b) for a, b in cfg['correccionesS2tw']['reglas']]
def fix(s):
    for rx, b in reglas:
        s = rx.sub(b, s)
    return s
src = json.load(sys.stdin)
raw = [s2tw.convert(x) for x in src]
t = [fix(x) for x in raw]
back = [tw2s.convert(x) for x in t]
try:
    from importlib.metadata import version
    v = version('opencc')
except Exception:
    v = '?'
json.dump({'t': t, 'back': back, 'raw': raw, 'version': v}, sys.stdout, ensure_ascii=False)
