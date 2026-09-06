"""Prepare the approved Azrak imp sprites from their original ImageGen outputs."""
from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np

SOURCE = Path('C:/Users/User/.codex/generated_images/01a07711-e926-71f0-8a4d-71caca01a5dd')
DEST = Path(__file__).resolve().parents[1] / 'assets/images/ambiente/reino-azrak'
FILES = {
    'exec-513e0915-34d4-4692-a964-14346d1b7567.png': 'demonio-volador-v1.png',
    'exec-2f47daf6-7476-455a-8b40-12ef41a6b57b.png': 'demonio-paso-1-v1.png',
    'exec-94020e8d-82f3-47ff-9ef5-e2130f338bf3.png': 'demonio-paso-2-v1.png',
    'exec-6dba512e-be31-4914-a728-6b30cf723dc4.png': 'demonio-volador-alas-bajas-v1.png',
    'exec-459d82b9-fbd9-4a3b-8c92-c2d6a19779b2.png': 'cancerbero-acecho-v1.png',
}
for source, output in FILES.items():
    rgb = np.asarray(Image.open(SOURCE / source).convert('RGB')).copy()
    low, high = rgb.min(axis=2), rgb.max(axis=2)
    background = (low > 185) & ((high.astype(int) - low) < 35)
    alpha = Image.fromarray(np.where(background, 0, 255).astype('uint8'))
    # Remove the pale antialias fringe, including inside the curled tails.
    alpha = alpha.filter(ImageFilter.MinFilter(3))
    rgba = Image.fromarray(rgb).convert('RGBA')
    rgba.putalpha(alpha)
    if output == 'demonio-volador-alas-bajas-v1.png':
        # Align the eyes and torso with the existing wings-up frame.
        resized = rgba.resize((410, 410), Image.Resampling.LANCZOS)
        rgba = Image.new('RGBA', (512, 512))
        rgba.alpha_composite(resized, (94, 100))
    elif output == 'cancerbero-acecho-v1.png':
        rgba = rgba.resize((640, 427), Image.Resampling.LANCZOS)
        rgba = rgba.crop(rgba.getbbox())
    else:
        rgba = rgba.resize((512, 512), Image.Resampling.LANCZOS)
    rgba.save(DEST / output, optimize=True)
    a = np.asarray(rgba.getchannel('A'))
    assert a[0, 0] == 0 and (a == 0).mean() > .3 and (a == 255).mean() > .08
    print(output, f'RGBA {rgba.width}x{rgba.height};', round((a == 0).mean() * 100), '% transparent')
