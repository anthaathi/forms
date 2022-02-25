import { Fragment } from 'react';
import validateComponentRegistryElements from './validate-component-registry-elements';

describe('ComponentRegistryProviderUtils', () => {
  it('should validate component registry elements', () => {
    expect(validateComponentRegistryElements([])).toBe(true);
    expect(
      validateComponentRegistryElements([
        { type: 'Test', component: Fragment },
      ]),
    ).toBe(true);
    expect(
      validateComponentRegistryElements([
        { type: 'test', component: Fragment },
      ]),
    ).toBe(false);
  });
});
