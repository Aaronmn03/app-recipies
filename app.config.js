import 'dotenv/config';

export default{
  "expo": {
    "name": "app",
    "slug": "app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icon.png",
    "userInterfaceStyle": "light",
    "schema": "app",
    "newArchEnabled": true,
    "splash": {
      "image": "./src/assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.aaron.app"
    },
    "extra": {
      "eas": {
        "projectId": "5705692e-9db3-45e5-8052-80597f400c67"
      },
      "REACT_APP_HOST_API": process.env.REACT_APP_HOST_API,
      "REACT_APP_PORT_API": process.env.REACT_APP_PORT_API,
    },
    "web": {
      "favicon": "./src/assets/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
  }
}
