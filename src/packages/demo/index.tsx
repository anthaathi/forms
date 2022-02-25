/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { lazy, StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';

import { Cell, Grid } from 'baseui/layout-grid';
import {
  ComponentRegistryProvider,
  ComponentRegistryProps,
  RenderComponent,
} from '../render';
import { RenderComponentsProps } from '../render/Components/RenderComponent';

const engine = new Styletron({
  prefix: '_',
});

const componentRegistry: ComponentRegistryProps[] = [
  { type: 'Button', component: Button, dynamicProps: ['children'] },
  { type: 'Input', component: Input },
  {
    type: 'Block',
    component: lazy(() =>
      import('baseui/block').then((d) => ({ default: d.Block })),
    ),
    dynamicProps: ['children'],
  },
  // @ts-ignore
  { type: 'Grid', component: Grid, dynamicProps: ['children'] },
  { type: 'Cell', component: Cell, dynamicProps: ['children'] },
];

const component: RenderComponentsProps<any> = {
  schema: {
    $$kind: 'span',
    children: [
      { $$kind: 'span', children: <div>Hello world</div> },
      { $$kind: 'span', children: <div>Hello world</div> },
      { $$kind: 'span', children: null },
    ],
  },
  version: 'alpha0',
};

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ComponentRegistryProvider elements={componentRegistry}>
          <Suspense fallback={<p>Loading</p>}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <RenderComponent {...component} />
          </Suspense>
        </ComponentRegistryProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
