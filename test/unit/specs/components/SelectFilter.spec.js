import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import SelectFilter from '@/components/SelectFilter';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('SelectFilter.vue', () => {
    let store = null;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {},
            actions: {
                getHobbysList: jest.fn()
            },
            getters: {
                getAlphabetList: jest.fn()
            }
        });
    });

    it('should render', () => {
        const wrapper = shallowMount(SelectFilter, { store, localVue });
        expect(wrapper.isVueInstance()).toBeTruthy();
    });
});