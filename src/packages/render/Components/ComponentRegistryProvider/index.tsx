import * as React from 'react';
import { useEffect } from 'react';
import {
  ComponentRegistry,
  ComponentRegistryProps,
} from '../../Context/ComponentRegistry';
import validateComponentRegistryElements from './utils/validate-component-registry-elements';

export interface ComponentRegistryProviderProps {
  elements: ComponentRegistryProps[];
  children: React.ReactNode;
}

/**
 * Provides and validate the elements
 * @param elements
 * @param children
 * @constructor
 */
export default function ComponentRegistryProvider({
  elements,
  children,
}: ComponentRegistryProviderProps) {
  useEffect(() => {
    const isValid = validateComponentRegistryElements(elements);

    if (!isValid) {
      // eslint-disable-next-line no-console
      console.warn('all element types should start with capital name');
    }
  }, [elements]);

  return (
    <ComponentRegistry.Provider value={elements}>
      {children}
    </ComponentRegistry.Provider>
  );
}
