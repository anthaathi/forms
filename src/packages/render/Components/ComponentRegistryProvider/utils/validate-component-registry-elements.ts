import { ComponentRegistryProps } from '../../../Context/ComponentRegistry';
import startWithCapital from '../../RenderComponent/utils/start-with-capital';

/**
 * Validates the props for the registry
 * Rules
 *  1. Element type should start with capital letter
 * @param elements
 */
export default function validateComponentRegistryElements(
  elements: ComponentRegistryProps[],
): boolean {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }

  return (
    elements.filter((element) => !startWithCapital(element.type)).length === 0
  );
}
