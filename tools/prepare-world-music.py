"""Convert the licensed originals to quiet, compact Android-compatible MP3s.

Usage: python tools/prepare-world-music.py --source-dir <download-directory>
Requires imageio-ffmpeg. Original download URLs are in docs/world-music.md.
"""
import argparse
import pathlib
import subprocess
import imageio_ffmpeg

parser = argparse.ArgumentParser()
parser.add_argument('--source-dir', required=True, type=pathlib.Path)
args = parser.parse_args()
output = pathlib.Path(__file__).resolve().parents[1] / 'assets' / 'sounds'
tracks = [
    ('sunset-final.wav', 'world-forest-sunset-plains.mp3', 'Sunset Plains', 'Yoiyami'),
    ('egyptian-meditation.ogg', 'world-desert-meditation.mp3', 'Egyptian Meditation Music', 'brandon75689'),
    ('rising-moon.mp3', 'world-sky-rising-moon.mp3', 'Fantasy: Rising Moon', 'RandomMind'),
    ('snow-inspect/Snow Theme/BGM_Snow_Theme_Slowed_Loop.wav', 'world-winter-slow.mp3', 'Through the Snow (Slowed)', 'Cleyton Kauffman'),
    ('snow-inspect/Snow Theme/BGM_Snow_Theme_Loop.wav', 'world-winter-through-snow.mp3', 'Through the Snow', 'Cleyton Kauffman'),
    ('at-end-of-hope-loop.wav', 'world-azrak-end-of-hope.mp3', 'At the End of Hope (Loop)', 'Emma_MA'),
]
for original, filename, title, author in tracks:
    source = args.source_dir / original
    if not source.is_file():
        raise FileNotFoundError(source)
    target = output / filename
    subprocess.run([
        imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-loglevel', 'error', '-y',
        '-i', str(source), '-vn', '-af', 'loudnorm=I=-18:TP=-3:LRA=8',
        '-ar', '44100', '-ac', '2', '-codec:a', 'libmp3lame', '-b:a', '112k',
        '-map_metadata', '-1', '-metadata', 'title=' + title,
        '-metadata', 'artist=' + author, '-metadata', 'copyright=CC0 1.0', str(target),
    ], check=True)
    print(filename, target.stat().st_size, flush=True)
