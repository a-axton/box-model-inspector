import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'lib/index.js',
  dest: 'dist/box-model-inspector.js',
  format: 'umd',
  moduleName: 'BoxModelInspector',
  plugins: [
    uglify()
  ]
}
