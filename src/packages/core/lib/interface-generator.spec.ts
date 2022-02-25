import interfaceGenerator from './interface-generator';

describe('Interface generator', () => {
  it('should render imports', () => {
    const result = interfaceGenerator({
      'baseui/input': ['Input'],
      'baseui/layout-grid': ['Grid', 'Cell'],
    });

    expect(result).toMatchSnapshot();
  });
});
