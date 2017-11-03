//
//  StringProvider.m
//  TestNativeModules
//
//  Created by Brandon Shepherd on 10/10/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "StringProvider.h"
#import "ReaderController.h"

@implementation StringProvider

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getSomeString:(RCTResponseSenderBlock)callback)
{
  // Change this depending on what you want to retrieve:
  NSString* someString = @"This is the cool text that I wanted to display from the native side";
  
  callback(@[someString]);
}

@end
