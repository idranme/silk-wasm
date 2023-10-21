cmake_minimum_required(VERSION 3.5)

## Project
project(SilkCodec)

## Flags and includes for building
# Note that we make sure not to overwrite previous flags
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -O3")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS}")
set(CMAKE_C_COMPILE gcc)
set(CMAKE_CXX_COMPILER g++)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/build/)

## Add any additional library paths here
# ${CMAKE_CURRENT_BINARY_DIR} lets you use any library currently being built
link_directories(
  ${CMAKE_CURRENT_BINARY_DIR}
)

## Include headers
# Add all the files needed to compile here
include_directories(
  silk/src/SILK_SDK_SRC_ARM_v1.0.9/interface/
  silk/src/SILK_SDK_SRC_ARM_v1.0.9/src/
)

## Including silk src
file(GLOB SILK_SRC
  silk/src/SILK_SDK_SRC_ARM_v1.0.9/src/*.c
)

## Build and link
# Add all the files needed to compile here
add_library(${PROJECT_NAME} SHARED
  ${SILK_SRC}
  src/encoder.c
  src/decoder.c
)

add_library(${PROJECT_NAME}_static STATIC
  ${SILK_SRC}
  src/encoder.c
  src/decoder.c
)
