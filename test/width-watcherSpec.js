describe('Width watcher', function() {
    var widthWatcher;

    beforeEach(function() {
        widthWatcher = WidthWatcher();
    });

    it('should add single breakpoint', function() {
        widthWatcher.add(768);
        expect(widthWatcher.getBreakpoints()).toEqual([768]);
    });

    it('should add array', function() {
        widthWatcher.add([768, 980]);
        expect(widthWatcher.getBreakpoints()).toEqual([768, 980]);
    });

    it('should add mixed agrgs', function() {
        widthWatcher.add([768, 980], 480, [320]);
        expect(widthWatcher.getBreakpoints().length).toEqual(4);
    });

    it('should not exept non-integer values', function() {
        expect(function () {
            widthWatcher.add('test')
        }).toThrow(new Error('WidthWatcher only accepts unsigned integers'));
    });
});