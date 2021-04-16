import '@fmma-npm/frelude';
import { command, string } from '@fmma-npm/commander';

command(require('../package.json'))
    .arg(string('PROJECT_NAME'))
    .switch('no-git')
    .run(opts => projectName => {
        const folder = `D:\\projects\\fmma-npm\\${projectName}`
        io.make_dir(folder);

        io.write_file(folder.path_append('package.json'), JSON.stringify(
            {
                "name": `@fmma-npm/${projectName}`,
                "version": "0.0.1",
                "description": "",
                "scripts": {
                    "prepublishOnly": "tsc && rollup -c",
                    "build": "tsc && rollup -c",
                    "watch": "tsc -w && rollup -w -c",
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "repository": {
                    "type": "git",
                    "url": `git+https://github.com/fmma/npm-${projectName}.git`
                },
                "keywords": [
                    "pl",
                    "language",
                    "compiler",
                    "parser",
                    "interpreter"
                ],
                "author": "Frederik Madsen",
                "license": "ISC",
                "bugs": {
                    "url": `https://github.com/fmma/npm-${projectName}/issues`
                },
                "bin": {
                    [projectName]: "dist/cli.js"
                },
                "homepage": `https://github.com/fmma/npm-${projectName}#readme`,
                "devDependencies": {
                    "@fmma-npm/commander": "../commander/commander",
                    "@fmma-npm/frelude": "../frelude",
                    "@rollup/plugin-commonjs": "^18.0.0",
                    "@rollup/plugin-json": "^4.1.0",
                    "@rollup/plugin-node-resolve": "^11.2.1",
                    "rollup": "2.45.2"
                },
                "files": [
                    "dist"
                ]
            }
            , undefined, 2)
        );

        io.write_file(folder.path_append('tsconfig.json'), JSON.stringify(
            {
                "compilerOptions": {
                    "target": "es2019",
                    "module": "CommonJS",
                    "declaration": true,
                    "strict": true,
                    "esModuleInterop": true,
                    "skipLibCheck": true,
                    "forceConsistentCasingInFileNames": true,
                    "rootDir": "src",
                    "outDir": "lib"
                }
            }
            , undefined, 2)
        );

        io.write_file(folder.path_append('rollup.config.js'), [
            "import resolve from '@rollup/plugin-node-resolve';",
            "import commonjs from '@rollup/plugin-commonjs';",
            "import json from '@rollup/plugin-json';",
            "export default {",
            "    input: 'lib/cli.js',",
            "    output: {",
            "        banner: '#!/usr/bin/env node',",
            "        file: 'dist/cli.js',",
            "        format: 'cjs',",
            "        exports: 'default'",
            "    },",
            "    external: ['fs', 'path', 'process'],",
            "    plugins: [",
            "        resolve(),",
            "        commonjs(),",
            "        json()",
            "    ]",
            "};"
        ].join('\n'));


        io.make_dir(folder.path_append('src'));
        io.write_file(folder.path_append('src').path_append('cli.ts'), [
            "import '@fmma-npm/frelude';",
            "import { command } from '@fmma-npm/commander';",
            "",
            "command(require('../package.json'))",
            "    .run(opts => {",
            "        console.log('NOT IMPLEMENTED YET')",
            "    })",
            "    .exec();"
        ].join('\n'));

        io.write_file(folder.path_append('.gitignore'), [
            "dist",
            "lib",
            "node_modules",
            "tsconfig.tsbuildinfo",
            ".vscode"
        ].join('\n'))

        io.write_file(folder.path_append('README.md'), [
            `# ${projectName}`,
            "TODO"
        ].join('\n'))

        io.cd(folder);

        io.execEcho('npm i');
        io.execEcho('npm run build');
        io.execEcho('node dist/cli.js');

        if (!opts['no-git']) {
            io.execEcho('git init');
            io.execEcho('git add .');
            io.execEcho('git commit -m "first commit"');
            io.execEcho('git branch -M main');
            io.execEcho(`git remote add origin https://github.com/fmma/npm-${projectName}.git`);
            try {
                io.execEcho('git push -u origin main');
            } catch (e) {
                console.log(`Repository npm-${projectName} does not exist on github.`)
                console.log('Run the following command if you decide to create it:')
                console.log("git push -u origin main");
            }
        }

        io.execEcho('code .');
    })
    .exec();