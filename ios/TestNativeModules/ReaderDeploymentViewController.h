//
//  ReaderDeploymentViewController.h
//  TestNativeModules
//
//  Created by Brandon Shepherd on 10/11/17.
//  Copyright © 2017 Facebook. All rights reserved.
//


#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import "ReaderController.h"

@interface ReaderDeploymentViewController : NSObject <RCTBridgeModule, ReaderControllerDelegate> {
@private
  ReaderController *controller;
  
}

@end
