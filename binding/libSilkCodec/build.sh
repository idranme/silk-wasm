#!/bin/bash
cmake -B build/ . \
  && cd build \
  && make -j 8
