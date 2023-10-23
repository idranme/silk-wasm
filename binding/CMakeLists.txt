cmake_minimum_required(VERSION 3.10)

## Project
project(silk_wasm)

## Flags and includes for building
# Note that we make sure not to overwrite previous flags
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -O3")
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -O3")
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}/build/)

## Add any additional library paths here
# ${CMAKE_CURRENT_BINARY_DIR} lets you use any library currently being built
link_directories(
  ${CMAKE_CURRENT_BINARY_DIR}
)

## Include headers
# Add all the files needed to compile here
include_directories(
  libSilkCodec/silk/src/SILK_SDK_SRC_ARM_v1.0.9/interface/
  libSilkCodec/silk/src/SILK_SDK_SRC_ARM_v1.0.9/src/
)

## Including silk src
file(GLOB SILK_SRC
  libSilkCodec/silk/src/SILK_SDK_SRC_ARM_v1.0.9/src/*.c
)

add_library(silk_static STATIC
  ${SILK_SRC}
  libSilkCodec/src/encoder.c
  libSilkCodec/src/decoder.c
)

add_executable(${PROJECT_NAME} index.cpp)

# -s TOTAL_MEMORY=314572800 
set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS  "-lembind -sMODULARIZE -sALLOW_MEMORY_GROWTH")

target_include_directories(${PROJECT_NAME}
  PRIVATE
  libSilkCodec/src/include
)

target_link_libraries(${PROJECT_NAME} silk_static)