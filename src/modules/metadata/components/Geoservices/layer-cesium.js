import WebMapServiceImageryProvider from 'cesium/Scene/WebMapServiceImageryProvider';

export function cesiumLayer(config) {
  if (config.type === 'wms') {
    return new WebMapServiceImageryProvider({
      parameters: {
        transparent: true,
        format: 'image/png',
      },
      url: config.baseURL,
      layers: config.name,
      enablePickFeatures: true,
    });
  }
  return null;
}
