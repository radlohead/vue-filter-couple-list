import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/components/Home';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Home.vue', () => {
	let store = null;

	beforeEach(() => {
		store = new Vuex.Store({
			state: {}
		});
	});

	it('should render test', () => {
		const wrapper = shallowMount(Home, { store, localVue });
		expect(wrapper.isVueInstance()).toBeTruthy();
	});
});
