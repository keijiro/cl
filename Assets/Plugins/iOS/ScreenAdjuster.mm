#import <Foundation/Foundation.h>

extern "C" float _ScreenAdjusterGetBrightness() {
    UIScreen *screen = [UIScreen mainScreen];
    if (screen && [screen respondsToSelector:@selector(setBrightness:)]) {
        return [screen brightness];
    } else {
        return 1.0f;
    }
}

extern "C" void _ScreenAdjusterSetBrightness(float level) {
    UIScreen *screen = [UIScreen mainScreen];
    if (screen && [screen respondsToSelector:@selector(setBrightness:)]) {
        [screen setBrightness:level];
    }
}
