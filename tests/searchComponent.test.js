import { h } from 'preact';
import Search from '../src/components/search/search.component';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

let context = null;
beforeEach(()=> {
    context = shallow(<Search />);
})
describe('Initial Test of the Search Component', () => {
	test('Search renders div element', () => {
        expect(context.contains(<div class="container" />)).toEqual(true);
    });
    test('Search input label has City text', () => {
        expect(context.find('#input-city').text()).toBe('City');
    });
    test('Search renders submit button element', () => {
        expect(context.find('#input-city').text()).toBe('City');
    });
});

