/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Block } from 'baseui/block';

import { Cell, Grid } from 'baseui/layout-grid';
import { StrictMode } from 'react';
import {
  ComponentRegistry,
  ComponentRegistryProps,
  RenderComponent,
} from '../render';
import { RenderComponentsProps } from '../render/Components/RenderComponent';

const engine = new Styletron({
  prefix: '_',
});

const componentRegistry: ComponentRegistryProps[] = [
  { type: 'button', component: Button, dynamicProps: ['children'] },
  { type: 'input', component: Input },
  { type: 'block', component: Block, dynamicProps: ['children'] },
  // @ts-ignore
  { type: 'grid', component: Grid, dynamicProps: ['children'] },
  { type: 'cell', component: Cell, dynamicProps: ['children'] },
];

const component: RenderComponentsProps = {
  __component: 'block',
  children: [
    {
      __component: 'grid',
      maxWidth: 0,
      margin: 0,

      children: [
        {
          __component: 'cell',
          span: 6,
          children: {
            __component: 'input',
            placeholder: 'Search',
          },
        },
        {
          __component: 'cell',
          span: 6,
          children: {
            __component: 'button',
            children: 'JSX',
          },
        },
      ],
    },
  ],
};

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ComponentRegistry.Provider value={componentRegistry}>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <RenderComponent {...component} />
        </ComponentRegistry.Provider>
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
