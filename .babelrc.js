const babelConfig = () => {
  const presets = ['next/babel'];
  const plugins = [
    ['babel-plugin-styled-components', { ssr: true, displayName: true }],
  ];

  if (process.env.NEXT_PUBLIC_STAGE === 'production') {
    plugins.push([
      'transform-remove-console',
      { exclude: ['assert', 'debug', 'error', 'warn', 'info', 'trace'] },
    ]);
  }

  return {
    presets,
    plugins,
  };
};

module.exports = babelConfig();
