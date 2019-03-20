import serve from 'rollup-plugin-serve'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

// NOTE dynamic import doesn't currently work.
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: /node_modules/
    }),
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render']
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    serve({
      contentBase: 'dist',
      open: true
    })
  ]
}
