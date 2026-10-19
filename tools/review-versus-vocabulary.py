"""Reproduce lexical screening. Dependencies and pinned dictionaries stay outside the game.

Usage: python tools/review-versus-vocabulary.py CACHE_DIRECTORY
Requires spylls 0.1.7 on PYTHONPATH. This is not a production database operation.
Candidates were selected by category; dictionary membership only verifies spelling.
"""
import hashlib
import json
import sys
import subprocess
import unicodedata
from pathlib import Path
from spylls.hunspell import Dictionary

ROOT = Path(__file__).resolve().parents[1]
CACHE = Path(sys.argv[1])
read = lambda p: json.loads(p.read_text(encoding="utf-8"))
write = lambda p, value: p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
candidates = read(ROOT / "data/versus-vocabulary-candidates.json")
baseline = json.loads(subprocess.check_output(["node", "-e", "process.stdout.write(JSON.stringify(require('./js/word-banks-versus.js').banks))"], cwd=ROOT))
source = read(CACHE / "source.json")
countries = read(CACHE / "countries.json")

def key(word):
    return "".join(c for c in unicodedata.normalize("NFD", word.upper()) if not unicodedata.combining(c))

sources = {"dictionaries": {k: source[k] for k in ("repository", "commit")}, "country_names": {
    "url": "https://raw.githubusercontent.com/mledoze/countries/" + source["countryCommit"] + "/countries.json",
    "commit": source["countryCommit"],
    "sha256": hashlib.sha256((CACHE / "countries.json").read_bytes()).hexdigest(),
    "note": "Exact common/official names only; no arbitrary removal of spaces or hyphens."
}}
for lang in ("en_US", "pt_BR"):
    sources[lang] = {ext: hashlib.sha256((CACHE / (lang + "." + ext)).read_bytes()).hexdigest() for ext in ("dic", "aff")}

result = {"version": "versus-expanded-v1", "sources": sources, "additions": {}, "evidence": [], "excluded": []}
# Editorial ceilings are flexible, not lexical evidence. Unused valid candidates
# are recorded as reserves, distinct from rejected words.
ceilings = {
    "en": dict(zip(candidates["en"], [100, 60, 275, 210, 190, 78, 100, 437, 250, 300])),
    "pt-BR": dict(zip(candidates["pt-BR"], [100, 90, 260, 210, 190, 78, 90, 422, 260, 300])),
}
editorial = {
    "en": {"frutas": {"JUNIPER", "SULTANA"}, "animales": {"ASS", "BASILISK"},
           "profesiones": {"HOST", "SPECIALIST"},
           "deportes": {"BULLFIGHTING", "GEOCACHING", "BALLET", "TENPIN"},
           "transportes": {"COGWHEEL"},
           "objetos": {"CROCHET", "HARDWARE", "PLASTIC", "LUGGAGE", "CUTLERY"},
           "naturaleza": {"GAS", "RUST", "RUBBLE"}},
    "pt-BR": {"frutas": {"ABIO", "CASTANHA", "OLIVA"},
              "comidas": {"BAIÃO", "CROCANTE"},
              "animales": {"CAVALINHO", "MANDARIM", "TATURANA"},
              "deportes": {"ARCO", "SUPINO", "DOMINÓ", "BALÉ", "DANÇA"},
              "transportes": {"CARRINHO", "CRUZEIRO", "PRANCHA", "RABETA"},
              "objetos": {"CERA", "GESSO", "PLÁSTICO", "LOUÇA", "FOLHA"},
              "naturaleza": {"BLOCO", "CAMADA", "CORRENTEZA", "DE REPENTE"}},
}
result["reserves"] = []
for language, topics in candidates.items():
    lang = "en_US" if language == "en" else "pt_BR"
    dictionary = Dictionary.from_files(str(CACHE / lang))
    country_set = set()
    for country in countries:
        names = country["name"] if language == "en" else country.get("translations", {}).get("por", {})
        country_set.update(v.upper() for k, v in names.items() if k in ("common", "official"))
    result["additions"][language] = {}
    for topic, text in topics.items():
        seen = {key(w) for w in baseline[language][topic]}
        approved = []
        for word in text.split():
            why = None
            evidence = None
            allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + ("ÁÀÂÃÉÊÍÓÔÕÚÜÇ" if language == "pt-BR" else "")
            if word in editorial.get(language, {}).get(topic, set()):
                why = "editorial_ambiguity_or_category_fit"
            elif not 3 <= len(word) <= 12 or any(c not in allowed for c in word):
                why = "length_or_characters"
            elif key(word) in seen:
                why = "already_present_or_normalized_duplicate"
            elif topic == "paises":
                if word in country_set:
                    evidence = "country_names"
                else:
                    why = "country_name_not_confirmed_by_exact_source"
            else:
                # Names must be accepted with proper-name capitalization. Ordinary words
                # must be accepted in lowercase; an unrelated proper name is not evidence.
                spelling = word.title() if topic == "nombres" else word.lower()
                if dictionary.lookup(spelling):
                    evidence = lang + ":" + spelling
                else:
                    why = "spelling_not_confirmed_by_pinned_dictionary"
            if why:
                result["excluded"].append({"language": language, "theme": topic, "word": word, "reason": why})
            else:
                seen.add(key(word))
                row = {"language": language, "theme": topic, "word": word, "source": evidence}
                if len(baseline[language][topic]) + len(approved) < ceilings[language][topic]:
                    approved.append(word)
                    result["evidence"].append(row)
                else:
                    result["reserves"].append(row)
        result["additions"][language][topic] = approved
    print(language, {t: len(baseline[language][t]) + len(a) for t, a in result["additions"][language].items()}, flush=True)
    print("new", sum(map(len, result["additions"][language].values())), flush=True)
write(ROOT / "data/versus-vocabulary.json", result)
