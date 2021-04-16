import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
export default {
    input: 'lib/cli.js',
    output: {
        banner: '#!/usr/bin/env node',
        file: 'dist/cli.js',
        format: 'cjs',
        exports: 'default'
    },
    external: ['fs', 'path', 'process', "@fmma-npm/commander", "@fmma-npm/frelude"],
    plugins: [
        resolve(),
        commonjs(),
        json()
    ]
};
