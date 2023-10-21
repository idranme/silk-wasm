## libSilkCodec
Cross-platform silk codec wrap library depends on [ploverlake/silk](https://github.com/ploverlake/silk).

## Clone & Build

Linux/Unix like
```bash
  # clone
  $ git clone https://github.com/KonataDev/libSilkCodec --recurse-submodules
  $ cd libSilkCodec

  # just make it
  $ cmake . && make -j8

  # or
  $ chmod +x build.sh
  $ ./build.sh
```

Windows
```bash
  # make sure you have
  # installed the Visual Studio

  # clone
  > git clone https://github.com/KonataDev/libSilkCodec --recurse-submodules
  > cd libSilkCodec

  # make it
  > cmake .
  > msbuild SilkCodec.sln

  # or
  # double click the `build.bat`
```

## Example
```C
  // Decode silk to pcm
  ret = silkDecode(data, dataLen, 24000, codecCallback, NULL);
  if(!ret) return 0xDEADC0DE;

  // Encode pcm to silk
  ret = silkEncode(data, dataLen, 24000, codecCallback, NULL);
  if(!ret) return 0xDEADC0DE;

  // Decode or Encode callback
  void codecCallback(void* userdata, unsigned char* p, int len) {
    writeData(p, len);
  }

```

## Todo
- [x] Callback with userdata
- [x] Static library

## Credits
- [ploverlake/silk](https://github.com/ploverlake/silk) offer the original SILK source code.

## License
licensed under MIT with ❤.
