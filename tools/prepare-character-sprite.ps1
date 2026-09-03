param(
    [Parameter(Mandatory = $true)]
    [string]$InputPath,

    [Parameter(Mandatory = $true)]
    [string]$OutputPath,

    [Parameter(Mandatory = $true)]
    [int]$Width,

    [Parameter(Mandatory = $true)]
    [int]$Height,

    [switch]$ChromaGreen
)

Add-Type -AssemblyName System.Drawing

if (-not ("CharacterSpritePrep" -as [type])) {
    $compilerReferences = [AppDomain]::CurrentDomain.GetAssemblies() |
        Where-Object { -not [string]::IsNullOrWhiteSpace($_.Location) } |
        ForEach-Object { $_.Location } |
        Select-Object -Unique
    Add-Type -ReferencedAssemblies $compilerReferences -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class CharacterSpritePrep
{
    private static bool IsChromaGreen(byte b, byte g, byte r)
    {
        return g >= 80 && g >= r * 1.45 && g >= b * 1.45;
    }

    private static bool IsBackground(byte b, byte g, byte r, bool removeChromaGreen)
    {
        int min = Math.Min(r, Math.Min(g, b));
        int max = Math.Max(r, Math.Max(g, b));
        return (min >= 218 && max - min <= 24) ||
            (removeChromaGreen && IsChromaGreen(b, g, r));
    }

    private static void TryEnqueue(int x, int y, int width, int stride, byte[] pixels, bool[] clear, int[] queue, ref int tail, bool removeChromaGreen)
    {
        int id = y * width + x;
        if (clear[id]) return;
        int offset = y * stride + x * 4;
        if (!IsBackground(pixels[offset], pixels[offset + 1], pixels[offset + 2], removeChromaGreen)) return;
        clear[id] = true;
        queue[tail++] = id;
    }

    public static void Convert(string inputPath, string outputPath, int targetWidth, int targetHeight, bool removeChromaGreen)
    {
        using (var sourceFile = new Bitmap(inputPath))
        using (var source = new Bitmap(sourceFile.Width, sourceFile.Height, PixelFormat.Format32bppArgb))
        {
            using (Graphics g = Graphics.FromImage(source))
            {
                g.DrawImageUnscaled(sourceFile, 0, 0);
            }

            int width = source.Width;
            int height = source.Height;
            var rect = new Rectangle(0, 0, width, height);
            BitmapData data = source.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int stride = data.Stride;
            byte[] pixels = new byte[stride * height];
            Marshal.Copy(data.Scan0, pixels, 0, pixels.Length);

            bool[] clear = new bool[width * height];
            int[] queue = new int[width * height];
            int head = 0;
            int tail = 0;

            for (int x = 0; x < width; x++)
            {
                TryEnqueue(x, 0, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
                TryEnqueue(x, height - 1, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
            }
            for (int y = 1; y < height - 1; y++)
            {
                TryEnqueue(0, y, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
                TryEnqueue(width - 1, y, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
            }

            while (head < tail)
            {
                int id = queue[head++];
                int x = id % width;
                int y = id / width;
                if (x > 0) TryEnqueue(x - 1, y, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
                if (x + 1 < width) TryEnqueue(x + 1, y, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
                if (y > 0) TryEnqueue(x, y - 1, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
                if (y + 1 < height) TryEnqueue(x, y + 1, width, stride, pixels, clear, queue, ref tail, removeChromaGreen);
            }

            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < width; x++)
                {
                    int offset = y * stride + x * 4;
                    if (!clear[y * width + x] &&
                        !(removeChromaGreen && IsChromaGreen(
                            pixels[offset], pixels[offset + 1], pixels[offset + 2]))) continue;
                    pixels[offset] = 0;
                    pixels[offset + 1] = 0;
                    pixels[offset + 2] = 0;
                    pixels[offset + 3] = 0;
                }
            }

            Marshal.Copy(pixels, 0, data.Scan0, pixels.Length);
            source.UnlockBits(data);

            using (var output = new Bitmap(targetWidth, targetHeight, PixelFormat.Format32bppArgb))
            using (Graphics g = Graphics.FromImage(output))
            {
                g.Clear(Color.Transparent);
                g.CompositingMode = CompositingMode.SourceCopy;
                g.CompositingQuality = CompositingQuality.HighQuality;
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.SmoothingMode = SmoothingMode.HighQuality;

                double scale = Math.Min((double)targetWidth / width, (double)targetHeight / height);
                int drawWidth = Math.Max(1, (int)Math.Round(width * scale));
                int drawHeight = Math.Max(1, (int)Math.Round(height * scale));
                int left = (targetWidth - drawWidth) / 2;
                int top = (targetHeight - drawHeight) / 2;
                g.DrawImage(source, new Rectangle(left, top, drawWidth, drawHeight), 0, 0, width, height, GraphicsUnit.Pixel);

                string directory = Path.GetDirectoryName(outputPath);
                if (!string.IsNullOrEmpty(directory)) Directory.CreateDirectory(directory);
                output.Save(outputPath, ImageFormat.Png);
            }
        }
    }
}
'@
}

[CharacterSpritePrep]::Convert(
    (Resolve-Path -LiteralPath $InputPath).Path,
    [System.IO.Path]::GetFullPath($OutputPath),
    $Width,
    $Height,
    [bool]$ChromaGreen
)
