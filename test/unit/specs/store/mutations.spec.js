import 'array-flat-polyfill';
import mutations from '@/store/mutations';
import hobbysList100 from '../../hobbysList100.json';

const mockState = {
    hobbysList: hobbysList100,
    hobbysMatchList: Array.from(Array(2), () => Array(0)),
    hobbysResultList: []
}

describe('mutations getHobbysList test', () => {
    mutations.getHobbysList(mockState);

    it('state.hobbysList test', () => {
        expect(mockState.hobbysList[0]).toEqual({ id: 1, hobbys: 'ABCDNOPRSV' });
    });

    it('state.hobbysMatchList matched test', () => {
        expect(mockState.hobbysMatchList[0].matched).toBe('10-32');
    });

    it('state.hobbysMatchList left, right test', () => {
        expect(mockState.hobbysMatchList[0].left).toBe('ABEHIMNQVY');
        expect(mockState.hobbysMatchList[0].right).toBe('ADEIMNOQVY');
    });
});