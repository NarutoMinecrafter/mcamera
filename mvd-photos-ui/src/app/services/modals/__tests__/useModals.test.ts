import {useModals} from '../useModals';

const mockLocation = {
    pathname: '/welcome',
    hash: '',
    search: '',
    state: ''
};

const mockHistory = {
    push: jest.fn(),
    location: {
        state: {
            isModal: true,
            previousLocation: 'previousLocation' as undefined | string
        }
    }
};


jest.mock('react-router-dom', () => ({
    useHistory: () => mockHistory,
    useLocation: () => mockLocation
}));
jest.mock('react', () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useCallback: (fn: any) => fn
}));

describe('useModals tests', () => {

    let obj: ReturnType<typeof useModals>;
    const Path = 'path';

    beforeEach(() => {
        obj = useModals();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('when useModals was called', () => {
        it('should return obj with required fields', () => {
            const {redirectToModal, history, goBack, location, previousLocation, isModal} = useModals();

            expect(redirectToModal).not.toBeUndefined();
            expect(history).not.toBeUndefined();
            expect(goBack).not.toBeUndefined();
            expect(location).not.toBeUndefined();
            expect(previousLocation).not.toBeUndefined();
            expect(isModal).not.toBeUndefined();
        });
    });

    describe('when previous history is passed', () => {

        beforeEach(() => {
            mockHistory.location.state.previousLocation = 'previousLocation';
        });

        describe('when redirect to modal has been called with path', () => {

            beforeEach(() => {
                obj.redirectToModal(Path);
            });

            it('should call history push once', () => {
                expect(obj.history.push).toBeCalledTimes(1);
            });

            it('should call history push with path to modal', () => {
                expect(obj.history.push).toHaveBeenCalledWith(`/modals/${Path}`, {
                    isModal: true, previousLocation: 'previousLocation'
                });
            });
        });

        describe('when goBack was called', () => {

            beforeEach(() => {
                obj.goBack();
            });

            it('should call history push once', () => {
                expect(obj.history.push).toBeCalledTimes(1);
            });

            it('should call history push with path to modal', () => {
                expect(obj.history.push).toHaveBeenCalledWith('previousLocation');
            });
        });
    });

    describe('when previous history is not passed', () => {

        beforeEach(() => {
            mockHistory.location.state.previousLocation = undefined;
        });

        describe('when redirect to modal has been called with path', () => {

            beforeEach(() => {
                obj.redirectToModal(Path);
            });

            it('should call history push once', () => {
                expect(obj.history.push).toBeCalledTimes(1);
            });

            it('should call history push with path to modal and location object', () => {
                expect(obj.history.push).toHaveBeenCalledWith(`/modals/${Path}`, {
                    isModal: true, previousLocation: mockHistory.location
                });
            });
        });

        describe('when goBack was called', () => {

            beforeEach(() => {
                obj.goBack();
            });

            it('should call history push once', () => {
                expect(obj.history.push).toBeCalledTimes(1);
            });

            it('should call history push with default route', () => {
                expect(obj.history.push).toHaveBeenCalledWith('/');
            });
        });
    });

});
