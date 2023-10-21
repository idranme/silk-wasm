@echo off

: Prepare projet
cmake -B build .

: Ready to build
start "" "%CD%\build\SilkCodec.sln"
