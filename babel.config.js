module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "@components": "./src/components",
          "@navigations": "./src/navigations",
          "@config":"./src/config",
          "@scenes": "./src/scenes",
          "@services": "./src/services",  
          "@assets": "./src/assets",
          "@assets/*": "./src/assets/*",
          "@components/*": "./src/components/*",
          "@navigations/*": "./src/navigations/*",
          "@scenes/*": "./src/scenes/*",
          "@services/*": "./src/services/*",
          "@config/*":"./src/config/*"
        }
      }
    ]
  ]

};
