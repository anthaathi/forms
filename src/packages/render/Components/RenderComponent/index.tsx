import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useComponentRegistry } from '../../Context/ComponentRegistry';
import startWithCapital from './utils/start-with-capital';

export interface RenderComponentsProps<T> {
  schema: {
    $$kind: string;
    children?: React.ReactNode;
  } & T;

  version: string;
}

/**
 * Render dynamic components just like json schema
 * @constructor
 */
export default function RenderComponent<T = any>({
  schema: { $$kind, ...props },
  version,
}: RenderComponentsProps<T>) {
  const componentRegistry = useComponentRegistry();

  const component = useMemo(
    () => componentRegistry.find((res) => res.type === $$kind),
    [$$kind, componentRegistry],
  );

  const propsToPass = useMemo(() => {
    const newProps = {
      ...props,
    } as T & any;

    function convertApp(value: any, index: number) {
      if (React.isValidElement(value)) {
        return value;
      }

      if (value && typeof value === 'object' && '$$kind' in value) {
        return (
          <RenderComponent
            key={value.id || index}
            version={version}
            schema={value}
          />
        );
      }

      if (!value) {
        return null;
      }

      return value;
    }

    Object.keys(newProps).forEach((res) => {
      if (res.startsWith('$$')) {
        delete newProps[res];
        return;
      }

      const value = newProps[res];

      if (Array.isArray(value)) {
        newProps[res] = value.map(convertApp);
      } else {
        newProps[res] = convertApp(value, 0);
      }
    });

    return newProps;
  }, [props, version]);

  const shouldRender = useMemo(
    () => component?.component || !startWithCapital($$kind),
    [$$kind, component?.component],
  );

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!shouldRender) {
        // eslint-disable-next-line no-console
        console.warn(`${$$kind} is not registered`);
      }
    }, [$$kind, shouldRender]);
  }

  if (!shouldRender) {
    return null;
  }

  return React.createElement(
    component?.component || $$kind,
    propsToPass,
    propsToPass?.children || null,
  );
}
