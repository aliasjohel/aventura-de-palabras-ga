"""Original, sample-free descending crystal chime for defeat feedback."""
import math
import pathlib
import struct
import wave

rate = 44100
samples = [0.0] * round(1.15 * rate)
for frequency, start, strength in [(329.6276, 0.0, 1.0), (261.6256, .21, .88), (220.0, .43, .78)]:
    for i in range(round(.64 * rate)):
        t = i / rate
        envelope = min(1.0, t / .009) * math.exp(-t / .15)
        envelope *= min(1.0, max(0.0, (.64 - t) / .07))
        tone = (math.sin(2 * math.pi * frequency * t)
                + .17 * math.sin(2 * math.pi * frequency * 2.76 * t) * math.exp(-t / .08)
                + .045 * math.sin(2 * math.pi * frequency * 5.4 * t) * math.exp(-t / .045))
        for delay, gain in [(0, 1.0), (.045, .13), (.09, .07)]:
            index = round((start + delay) * rate) + i
            if index < len(samples):
                samples[index] += strength * envelope * tone * gain

peak = max(abs(sample) for sample in samples)
target = pathlib.Path(__file__).resolve().parents[1] / 'assets/sounds/defeat-crystal-chime.wav'
with wave.open(str(target), 'wb') as output:
    output.setnchannels(1)
    output.setsampwidth(2)
    output.setframerate(rate)
    output.writeframes(b''.join(struct.pack('<h', round(sample / peak * .38 * 32767)) for sample in samples))
print(target, target.stat().st_size)
