/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react';
import { Block } from 'baseui/block';
import { BaseProvider, LightTheme } from 'baseui';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';
import RenderComponent from './index';
import ComponentRegistryProvider from '../ComponentRegistryProvider';

describe('RenderComponent', () => {
  it('should render components', () => {
    const consoleWarnMock = jest
      .spyOn(global.console, 'warn')
      .mockImplementation();
    const tree = render(
      <RenderComponent
        version="alpha1"
        schema={{
          $$kind: 'div',
          $$version: 'alpha0',
          'data-id': 'item-rendered1',
          children: [
            {
              $$kind: 'div',
              'data-id': 'item-rendered2',
              children: <div>Hello world</div>,
            },
            {
              $$kind: 'div',
              'data-id': 'item-rendered3',
              children: null,
            },
            {
              $$kind: 'Div',
              'data-id': 'item-rendered4',
              children: null,
            },
          ],
        }}
      />,
    );

    expect(global.console.warn).toHaveBeenCalledTimes(1);

    consoleWarnMock.mockRestore();

    expect(tree.container).toMatchSnapshot();
  });

  it('should render tree with passed components', () => {
    const engine = new Styletron({
      prefix: '_',
    });

    const tree = render(
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <ComponentRegistryProvider
            elements={[
              {
                type: 'Block',
                component: Block,
              },
            ]}
          >
            <RenderComponent
              version="alpha0"
              schema={{
                $$kind: 'div',
                children: {
                  $$kind: 'Block',

                  $style: {
                    marginTop: '12px',
                  },
                  children: [
                    {
                      $$kind: 'span',
                      children: 'test',
                    },
                    {
                      $$kind: 'span',
                      children: 'test2',
                    },
                  ],
                },
              }}
            />
          </ComponentRegistryProvider>
        </BaseProvider>
      </StyletronProvider>,
    );

    expect(tree.container).toMatchSnapshot();
  });
});
