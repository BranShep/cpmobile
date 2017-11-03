//
//  ReaderDeploymentViewController.m
//  HelloWorld
//
//  Created by John Fu on 09年12月16日.
//  Copyright 2009 __MyCompanyName__. All rights reserved.
//

#import "ReaderController.h"
#import "ReaderDeploymentViewController.h"
#import "CalendarManager.h"
#import "AppDelegate.h"
#import "TestNativeModules-Swift.h"

@implementation ReaderDeploymentViewController

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(initializeReader:(RCTResponseSenderBlock)callback)
{
  controller = [ReaderController SharedController];
  controller.delegate = self;
  controller.detectDeviceChange = YES;
  // Change this depending on what you want to retrieve:
  if ([controller isDevicePresent] == YES){
    NSString* deviceDetectedString = @"Swipe Card";
    callback(@[deviceDetectedString]);
  } else {
    NSString* deviceDetectedString = @"No Swipe Reader";
    callback(@[deviceDetectedString]);
  }
  
}


RCT_EXPORT_METHOD(testMethod:(RCTResponseSenderBlock)callback)
{
  NSString* someString = @"Reader started!";
  
  [controller startReader];
  
  callback(@[someString]);
}

RCT_EXPORT_METHOD(detect:(RCTResponseSenderBlock)callback) {
  NSLog(@"is device present? %@", ([controller isDevicePresent] ? @"YES" : @"NO"));
  if ([controller isDevicePresent] == YES){
    NSString* someString = @"DEVICE PLUGGED";
    
    callback(@[someString]);
  } else {
    NSString* someString = @"DEVICE UNPLUGGED";
    
    callback(@[someString]);
  }
}


#pragma mark -
#pragma mark ReaderControllerDelegate

- (void)onDecodeCompleted: (NSDictionary *)data {
  NSString* formatID = [data objectForKey:@"formatID"];
  NSString* maskedPAN = [data objectForKey:@"maskedPAN"];
  NSString* expiryDate = [data objectForKey:@"expiryDate"];
  NSString* ksn = [data objectForKey:@"ksn"];
  NSString* cardHolderName = [data objectForKey:@"cardHolderName"];
  NSString* track1Length = [data objectForKey:@"track1Length"];
  NSString* track2Length = [data objectForKey:@"track2Length"];
  NSString* encTracks = [data objectForKey:@"encTracks"];
  
  NSString* poo = @"hello";
  
  TestSwift *ts = [[TestSwift alloc] init];
  [ts cardSwipped:cardHolderName :maskedPAN :expiryDate];
  /* Implement your code here */
}
- (void)onDecodeError:(ReaderControllerDecodeResult)decodeResult {
  if (decodeResult == ReaderControllerDecodeResultSwipeFail)
  { /* Implement your code here */ }
  else if (decodeResult == ReaderControllerDecodeResultCRCError)
  { /* Implement your code here */ }
  else if (decodeResult == ReaderControllerDecodeResultCommError)
  { /* Implement your code here */ }
  else
  { /* Implement your code here */ }
}

- (void)onError { /* Implement your code here */ }
- (void)onInterrupted { /* Implement your code here */ }
- (void)onNoDeviceDetected {
}
- (void)onTimeout {
  TestSwift *ts = [[TestSwift alloc] init];
  [ts onTimeout];
}
- (void)onCardSwipeDetected {
  TestSwift *ts = [[TestSwift alloc] init];
  [ts onCardSwipeDetected];
}
- (void)onDecodingStart { /* Implement your code here */ }
- (void)onWaitingForCardSwipe { /* Implement your code here */ }
- (void)onWaitingForDevice { /* Implement your code here */ }
#pragma mark –
#pragma mark ReaderControllerDelegate Optional

- (void)onDevicePlugged {
    NSString* devicePluggedString = @"Swipe Card";
   NSLog(@"[ReaderDeploymentViewController] [onDevicePlugged]");
  
  TestSwift *ts = [[TestSwift alloc] init];
  [ts sendEventToJS:devicePluggedString];
}

- (void)onDeviceUnplugged {
  NSString* devicePluggedString = @"No Swipe Reader";
  NSLog(@"[ReaderDeploymentViewController] [onDeviceUnplugged]");
  
  TestSwift *ts = [[TestSwift alloc] init];
  [ts sendEventToJS:devicePluggedString];
}



@end

