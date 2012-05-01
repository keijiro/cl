#import <Foundation/Foundation.h>

extern "C" float _ScreenAdjusterGetBrightness() {
    return [UIScreen mainScreen].brightness;
}

extern "C" void _ScreenAdjusterSetBrightness(float level) {
    [UIScreen mainScreen].brightness = level;
}
