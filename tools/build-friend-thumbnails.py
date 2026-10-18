from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]/'assets/images'
paths=[root/'personajes/versus'/f'{name}-base.png' for name in ['explorador','mago','guardian-alba','t-shadow','kalamo','dragon','dragon-hielo','hombre-lobo','azrak']]+list((root/'perfil').glob('marco-*-v1.png'))
out=root/'perfil/miniaturas'
out.mkdir(exist_ok=True)
original=0;small=0
for path in paths:
    image=Image.open(path).convert('RGBA')
    image.thumbnail((96,96),Image.Resampling.LANCZOS)
    target=out/(path.stem+'.webp')
    image.save(target,'WEBP',quality=84,method=6)
    original+=path.stat().st_size;small+=target.stat().st_size
print(f'{len(paths)} thumbnails: {original} -> {small} bytes')
