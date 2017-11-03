// CalendarManager.m
#import "CalendarManager.h"

@implementation CalendarManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"test", @"cardSwipped", @"timedOut", @"cardSwipeDetected"];
}

- (void)sendEventToJS {
  [self sendEventWithName:@"test" body:@{@"name": @"poooopieee"}];
}

- (void)onDeviceUnplugged {
  NSString* devicePluggedString = @"DEVICE UNPLUGGED";
  NSLog(@"[ReaderDeploymentViewController] [onDeviceUnplugged]");
}


@end
