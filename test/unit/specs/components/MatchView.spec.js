import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MatchView from '@/components/MatchView';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MatchView.vue', () => {
	let store = null;

	beforeEach(() => {
		store = new Vuex.Store({
			state: {}
		});
	});

	it('should render', () => {
		const wrapper = shallowMount(MatchView, { store, localVue });
		expect(wrapper.isVueInstance()).toBeTruthy();
    });
});
