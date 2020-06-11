import { YesNoPipe } from './yes-no.pipe';

xdescribe('YesNoPipe', () => {
    it('create an instance', () => {
        const pipe = new YesNoPipe();
        expect(pipe).toBeTruthy();
    });
});
