module.exports = {
  project: {
    ios: {},
    android: {
      unstable_reactLegacyComponentNames: [
        'AIRMap',
        'AIRMapCallout',
        'AIRMapCalloutSubview',
        'AIRMapCircle',
        'AIRMapHeatmap',
        'AIRMapLocalTile',
        'AIRMapMarker',
        'AIRMapOverlay',
        'AIRMapPolygon',
        'AIRMapPolyline',
        'AIRMapUrlTile',
        'AIRMapWMSTile',
      ],
    },
  },
  assets: ['node_modules/@ant-design/icons-react-native/fonts'],
};