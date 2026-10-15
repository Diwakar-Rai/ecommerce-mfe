import { withNativeFederation, fromPackageJson } from '@angular-architects/native-federation-v4/config';

export default withNativeFederation({
  name: 'angular-profile',

  exposes: {
    './Component': './src/app/app.ts',
    './ProfileElement': './src/profile-element.ts',
  },

  shared: fromPackageJson({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
    build: 'package',
  }).patch(['@angular/core'], {
    includeSecondaries: { keepAll: true },
  }),

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    denseChunking: true,
  },
});
