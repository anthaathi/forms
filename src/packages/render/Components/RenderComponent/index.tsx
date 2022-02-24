import * as React from 'react';
import { useMemo } from 'react';
import { useComponentRegistry } from '../../Context/ComponentRegistry';

export interface RenderComponentsProps {
  __component: string;
  // We don't use any except for this place
  [props: string]: any;
}

/**
 * Render dynamic components just like json schema
 * @constructor
 */
export default function RenderComponent({
  __component,
  ...props
}: RenderComponentsProps) {
  const componentRegistry = useComponentRegistry();

  const component = useMemo(
    () => componentRegistry.find((res) => res.type === __component),
    [__component, componentRegistry],
  );

  const propsToPass = useMemo(() => {
    if (!component) {
      return null;
    }

    const newProps = {
      ...props,
    };

    function convertApp(value: any, index: number) {
      if (typeof value === 'object') {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <RenderComponent key={value.id || index} {...value} />;
      }

      if (!value) {
        return null;
      }

      return value;
    }

    Object.keys(newProps)
      .filter((key) => component?.dynamicProps?.indexOf(key) !== -1)
      .forEach((res) => {
        const value = newProps[res];

        if (Array.isArray(value)) {
          newProps[res] = value.map(convertApp);
        } else {
          newProps[res] = convertApp(value, 0);
        }
      });

    return newProps;
  }, [component, props]);

  if (!component) {
    return null;
  }

  return React.createElement(
    component.component,
    propsToPass,
    propsToPass?.children || null,
  );
}
