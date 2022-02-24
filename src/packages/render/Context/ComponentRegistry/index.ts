import {
  createContext,
  FunctionComponent,
  ComponentClass,
  useContext,
} from 'react';

type Prop = string | string[];

export interface ComponentRegistryProps {
  type: string;
  component: FunctionComponent | ComponentClass;
  dynamicProps?: (Prop | Prop[])[];
}

/**
 * Component registry
 */
export const ComponentRegistry = createContext<ComponentRegistryProps[]>([]);

export const useComponentRegistry = () => useContext(ComponentRegistry);
